import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { User } from 'src/auth/schemas/users.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.entyty';
import { Cart } from 'src/carts/schemas/carts.entity';
import { CartService } from 'src/carts/carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Delivery, Cart])],
  controllers: [OrdersController],
  providers: [OrdersService, CartService],
})
export class OrdersModule {}
