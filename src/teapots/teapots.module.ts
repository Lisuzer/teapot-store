import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from 'src/carts/carts.service';
import { Cart } from 'src/carts/schemas/carts.entity';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturers.entity';
import { Order } from 'src/orders/schemas/orders.entyty';
import { Teapot } from './schemas/teapots.entity';
import { TeapotsController } from './teapots.controller';
import { TeapotsService } from './teapots.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teapot, Manufacturer, Cart, Order])],
  controllers: [TeapotsController],
  providers: [TeapotsService, CartService],
})
export class TeapotsModule {}
