import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/schemas/users.entity';
import { CartService } from 'src/carts/carts.service';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { Connection, getConnection, QueryRunner, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/orders.entyty';
const moment = require('moment');

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRep: Repository<Order>,
        private cartService: CartService,
        private connection: Connection = getConnection(),
    ) { }

    async create(dto: CreateOrderDto): Promise<HTTP_RESPONSE> {
        const orderDate = moment().format("YYYY-MM-DD");
        const { userId, deliveryId, orderInfo, orderAddInfo } = dto;
        const queryRunner: QueryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const userEntity = await queryRunner.manager.findOne(User, userId);
            const deliveryEntity = await queryRunner.manager.findOne(Delivery, deliveryId);
            const addInfoToOrder = orderAddInfo ? orderAddInfo : "No add info for this order";
            const order = await queryRunner.manager.save(Order, {
                orderDate,
                orderAddInfo: addInfoToOrder,
                user: userEntity,
                delivery: deliveryEntity
            });
            const cartResult = await this.cartService.create({ orderId: order.id, orderInfo: orderInfo });
            if (!cartResult.success) {
                await queryRunner.rollbackTransaction();
                throw new HttpException("Can't create order", HttpStatus.BAD_REQUEST);
            }
            const orderEntity = await queryRunner.manager.findOne(Order, {
                where: { orderId: order.id },
            });
            await queryRunner.commitTransaction();
            return {
                data: orderEntity,
                message: "Created order, carts",
                success: true,
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            return {
                data: e,
                message: "Can't create order",
                success: false,
            }
        }
    }

    async update(id: string, dto: UpdateOrderDto): Promise<HTTP_RESPONSE> {
        try {
            const updatedOrder = await this.orderRep.update(id, dto);
            return {
                data: updatedOrder,
                message: "Created order",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't create order",
                success: false,
            }
        }
    }

    async delete(id: string): Promise<HTTP_RESPONSE> {
        try {
            const order = await this.orderRep.findOne(id);
            await this.orderRep.delete(id);
            return {
                data: order,
                message: "Deleted order",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't delete order",
                success: false,
            }
        }
    }

    async findById(id: string): Promise<HTTP_RESPONSE> {
        try {
            const order = await this.orderRep.findOne(id);
            if (!order) {
                throw new HttpException("No order with this id", HttpStatus.BAD_REQUEST);
            }
            return {
                data: order,
                message: "Finded order",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't find order",
                success: false,
            }
        }
    }

    async findAll(): Promise<HTTP_RESPONSE> {
        try {
            const orders = await this.orderRep.find();
            if (!orders) {
                throw new HttpException("No orders in database", HttpStatus.BAD_REQUEST);
            }
            return {
                data: orders,
                message: "Finded orders",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't find orders",
                success: false,
            }
        }
    }

    async getOrder({ user }: any) {
        try {
            const result = this.orderRep.find({ where: { userId: user.id } });
            return { data: { order: result }, message: "User orders", success: true }
        } catch (e) {
            return {
                data: null,
                success: false,
                message: e,
            }
        }
    }
}
