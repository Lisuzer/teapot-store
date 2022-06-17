import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturersDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './schemas/manufacturers.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturersRep: Repository<Manufacturer>,
  ) { }

  async getAll(): Promise<HTTP_RESPONSE> {
    const manufacturers = await this.manufacturersRep.find();
    if (!manufacturers) {
      throw new HttpException('Manufacturers not found', HttpStatus.BAD_REQUEST);
    }
    return {
      data: manufacturers,
      message: "All manufacturers",
      success: true,
    }
  }

  async getById(id: string): Promise<HTTP_RESPONSE> {
    const manufacturer = await this.manufacturersRep.findOne(id);
    if (!manufacturer) {
      throw new HttpException('Manufacturer not found', HttpStatus.BAD_REQUEST);
    }
    return {
      data: manufacturer,
      message: "Manufacturer bu id " + id,
      success: true,
    }
  }

  async delete(id: string): Promise<HTTP_RESPONSE> {
    const manufacturer = await this.manufacturersRep.findOne(id);
    if (!manufacturer) {
      throw new HttpException('Manufacturer not found', HttpStatus.BAD_REQUEST);
    }
    await this.manufacturersRep.delete(manufacturer.id);
    return {
      data: manufacturer,
      message: "Deleted manufacturer",
      success: true,
    }
  }

  async create(dto: CreateManufacturerDto): Promise<HTTP_RESPONSE> {
    const manufacturer = await this.manufacturersRep.save(dto);
    return {
      data: manufacturer,
      message: "Created manufacturer",
      success: true,
    }
  }

  async update(id: string, dto: UpdateManufacturersDto): Promise<HTTP_RESPONSE> {
    const manufacturer = await this.manufacturersRep.findOne(id)
    if (!manufacturer) {
      throw new HttpException('Manufacturer not found', HttpStatus.BAD_REQUEST);
    }
    await this.manufacturersRep.update(id, dto);
    const updatedManufacturer = await this.manufacturersRep.findOne(id);
    return {
      data: updatedManufacturer,
      message: "Updated manufacturer",
      success: true,
    }
  }
}
