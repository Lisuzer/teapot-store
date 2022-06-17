import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './schemas/deliveries.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery) private deliveryRep: Repository<Delivery>,
  ) { }

  async getAll(): Promise<HTTP_RESPONSE> {
    const deliveries = await this.deliveryRep.find();
    if (!deliveries) {
      throw new HttpException('Deliveries not found', HttpStatus.BAD_REQUEST);
    }
    return {
      data: deliveries,
      message: "All deliveries",
      success: true,
    };
  }

  async getById(id: string): Promise<HTTP_RESPONSE> {
    const delivery = this.deliveryRep.findOne({ where: { id } });
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.BAD_REQUEST);
    }
    return {
      data: delivery,
      message: "All deliveries",
      success: true,
    };
  }

  async create(dto: CreateDeliveryDto): Promise<HTTP_RESPONSE> {
    await this.deliveryRep.save(dto);
    return {
      data: dto,
      message: "Created delivery",
      success: true,
    }
  }

  async remove(id: string): Promise<HTTP_RESPONSE> {
    const delivery = await this.deliveryRep.findOne(id);
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.BAD_REQUEST);
    }
    await this.deliveryRep.delete(id);
    return {
      data: delivery,
      message: "Deleted delivery",
      success: true,
    }
  }

  async update(id: string, dto: UpdateDeliveryDto): Promise<HTTP_RESPONSE> {
    const delivery = await this.deliveryRep.findOne(id)
    if (!delivery) {
      throw new HttpException('Delivery not found', HttpStatus.BAD_REQUEST);
    }
    await this.deliveryRep.update(id, dto);
    const updatedDelivery = await this.deliveryRep.findOne(id);
    return {
      data: updatedDelivery,
      message: "Updated delivery",
      success: true,
    }
  }
}
