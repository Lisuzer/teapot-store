import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './schemas/manufacturers.entity';

@Injectable()
export class ManufacturerService {
    constructor(@InjectRepository (Manufacturer) private manufacturerRepository: Repository<Manufacturer>){}
}
