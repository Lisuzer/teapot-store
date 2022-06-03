import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturersDto } from './dto/update-manufacturer.dto';
import { ManufacturerService } from './manufacturers.service';
import { Manufacturer } from './schemas/manufacturers.entity';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private manufacturersService: ManufacturerService) {}

  @Get()
  getAll(): Promise<Manufacturer[]> {
    return this.manufacturersService.getAllManufacturers();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturersService.getOneManufacturer(id);
  }

  @Post()
  create(@Body() dto: CreateManufacturerDto): Promise<Manufacturer> {
    return this.manufacturersService.createManufacturer(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.manufacturersService.deleteManufacturer(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateManufacturersDto) {
    return this.manufacturersService.update(id, dto);
  }
}
