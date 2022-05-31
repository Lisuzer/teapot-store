import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { runInThisContext } from 'vm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturersDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './schemas/manufacturers.entity';

@Injectable()
export class ManufacturerService {
    constructor(@InjectRepository (Manufacturer) private manufacturersRepository: Repository<Manufacturer>){}

    async getAllManufacturers(): Promise<Manufacturer[]>{
        return this.manufacturersRepository.find();
    }

    async getOneManufacturer(id: string): Promise<Manufacturer>{
        return this.manufacturersRepository.findOne(id);
    }

    async deleteManufacturer(id: string): Promise<DeleteResult>{
        return this.manufacturersRepository.delete(id);
    }

    async createManufacturer(dto: CreateManufacturerDto): Promise<Manufacturer>{
        return this.manufacturersRepository.create(dto);
    }

    async update(id: string, dto: UpdateManufacturersDto): Promise<Manufacturer>{
        let manufacturer = await this.manufacturersRepository.findOne(id);
        manufacturer = {...manufacturer, ...dto};
        return this.manufacturersRepository.save(manufacturer);
    }
}
