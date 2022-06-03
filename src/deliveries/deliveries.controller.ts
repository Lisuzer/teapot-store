import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './schemas/deliveries.entity';

@ApiTags("deliveries")
@Controller('deliveries')
export class DeliveriesController {
    constructor(private deliveriesService: DeliveriesService) { }

    @Post()
    create(@Body() dto: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveriesService.createDelivery(dto);
    }

    @Get()
    getAll(): Promise<Delivery[]> {
        return this.deliveriesService.getAllDeliveries();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Delivery> {
        return this.deliveriesService.getOneDelivery(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.deliveriesService.removeDelivery(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateDeliveryDto): Promise<Delivery> {
        return this.deliveriesService.updateDelivery(id, dto);
    }
}
