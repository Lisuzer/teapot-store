import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './schemas/deliveries.entity';

@Injectable()
export class DeliveriesService {
    constructor(
        @InjectRepository(Delivery) private deliveryRepository: Repository<Delivery>,
    ) { }

    async createDelivery(dto: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryRepository.save(dto);
      }
    
      async getAllDeliveries(): Promise<Delivery[]> {
        return this.deliveryRepository.find();
      }
    
      async getOneDelivery(id: string): Promise<Delivery> {
        return this.deliveryRepository.findOne({ where: { id } });
      }
    
      async removeDelivery(id: string): Promise<DeleteResult> {
        return this.deliveryRepository.delete(id);
      }
    
      async updateDelivery(id: string, dto: UpdateDeliveryDto): Promise<Delivery> {
        let delivery = await this.deliveryRepository.findOne(id);
        delivery = { ...delivery, ...dto };
        return this.deliveryRepository.save(delivery);
      }
}
