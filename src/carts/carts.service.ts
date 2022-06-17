import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { Order } from 'src/orders/schemas/orders.entyty';
import { Teapot } from 'src/teapots/schemas/teapots.entity';
import { Connection, getConnection, QueryRunner, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './schemas/carts.entity';

@Injectable()
export class CartService {
    constructor(
        private connection: Connection = getConnection(),
        @InjectRepository(Cart)
        private cartRep: Repository<Cart>,
    ) { }

    async create(dto: CreateCartDto): Promise<HTTP_RESPONSE> {
        const { orderId, orderInfo } = dto;
        const payload = [];
        const queryRunner: QueryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const orderEntity = await queryRunner.manager.findOne(Order, orderId);
            let orderSum = orderEntity.orderSum;
            for (const purchase of orderInfo) {
                const { teapotId, amount } = purchase;
                const teapotEntity = await queryRunner.manager.findOne(Teapot, teapotId);
                orderSum += amount * teapotEntity.price;
                const result = await queryRunner.manager.save(Cart, {
                    amount: amount,
                    order: orderEntity,
                    teapot: teapotEntity
                });
                payload.push(result);
            }
            await queryRunner.manager.update(Order, orderId, { orderSum })
            await queryRunner.commitTransaction();
            return {
                data: payload,
                message: "Created carts",
                success: true,
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();
            return {
                data: e,
                message: "Can't create carts",
                success: false,
            }
        }
    }

    async remove(orderId: string): Promise<HTTP_RESPONSE> {
        try {
            const carts = await this.cartRep.find({ where: { orderId } });
            await this.cartRep.delete(orderId)
            return {
                data: carts,
                message: "Deleted cart(s)",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't delete cart(s)",
                success: false,
            }
        }
    }

    async findByorderId(orderId: string): Promise<HTTP_RESPONSE> {
        try {
            const carts = await this.cartRep.find({ where: { orderId } });
            return {
                data: carts,
                message: "Deleted cart(s)",
                success: true,
            }
        } catch (e) {
            return {
                data: e,
                message: "Can't delete cart(s)",
                success: false,
            }
        }
    }
}
