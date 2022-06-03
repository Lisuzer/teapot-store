import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/schemas/orders.entyty';
import { Teapot } from 'src/teapots/schemas/teapots.entity';
import { CartController } from './carts.controller';
import { CartService } from './carts.service';
import { Cart } from './schemas/carts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Order, Teapot])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartsModule {}
