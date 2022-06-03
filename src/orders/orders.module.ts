import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { User } from 'src/auth/schemas/users.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.entyty';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Delivery])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
