import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeapotsModule } from './teapots/teapots.module';
import { User } from './auth/schemas/users.entity';
import { ManufacturerModule } from './manufacturers/manufacturers.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { Manufacturer } from './manufacturers/schemas/manufacturers.entity';
import { Teapot } from './teapots/schemas/teapots.entity';
import { Cart } from './carts/schemas/carts.entity';
import { Order } from './orders/schemas/orders.entyty';
import { Delivery } from './deliveries/schemas/deliveries.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TeapotsModule,
    ManufacturerModule,
    DeliveriesModule,
    OrdersModule,
    CartsModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      entities: [User, Manufacturer, Teapot, Cart, Order, Delivery],
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
