import { BadRequestException, Injectable } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { Order } from 'src/orders/schemas/orders.entyty';
import { Teapot } from 'src/teapots/schemas/teapots.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/carts.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRep: Repository<Cart>,
    @InjectRepository(Order)
    private orderRep: Repository<Order>,
    @InjectRepository(Teapot)
    private teapotRep: Repository<Teapot>,
  ) { }

  async create(dto: CreateCartDto): Promise<HTTP_RESPONSE> {
    const { orderId, orderInfo } = dto;
    const payload = [];
    try {
      const orderEntity = await this.orderRep.findOne(orderId);
      let orderSum = orderEntity.orderSum;
      for (const purchase of orderInfo) {
        const { teapotId, amount } = purchase;
        const teapotEntity = await this.teapotRep.findOne(teapotId);
        orderSum += amount * teapotEntity.price;
        const result = await this.cartRep.save({
          amount: amount,
          order: orderEntity,
          teapot: teapotEntity,
        });
        payload.push(result);
      }
      await this.orderRep.update(orderId, { orderSum });
      return {
        data: payload,
        message: 'Created carts',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't create carts",
        success: false,
      };
    }
  }

  async remove(orderId: string): Promise<HTTP_RESPONSE> {
    try {
      const carts = await this.cartRep.find({ where: { orderId } });
      await this.cartRep.delete(orderId);
      return {
        data: carts,
        message: 'Deleted cart(s)',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't delete cart(s)",
        success: false,
      };
    }
  }

  async findByorderId(orderId: string): Promise<HTTP_RESPONSE> {
    try {
      const carts = await this.cartRep.find({ where: { orderId } });
      return {
        data: carts,
        message: 'Deleted cart(s)',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't delete cart(s)",
        success: false,
      };
    }
  }

  async update(
    orderId: string,
    teapotId: string,
    dto: UpdateCartDto,
  ): Promise<HTTP_RESPONSE> {
    const cart = await this.cartRep.findOne({ where: { orderId, teapotId } });
    await this.cartRep.update(cart, dto);
    const updatedCart = await this.cartRep.findOne({
      where: { orderId, teapotId },
    });
    return {
      data: updatedCart,
      message: 'Updated cart',
      success: true,
    };
  }

  async findByTeapot(teapot: Teapot) {
    try {
      const carts = await this.cartRep.find({ where: { teapot } });
      return {
        data: carts,
        message: 'Deleted cart(s)',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't delete cart(s)",
        success: false,
      };
    }
  }

  async deleteCart(orderId: string, teapotId: string): Promise<HTTP_RESPONSE> {
    const cart = await this.cartRep.findOne({ where: { orderId, teapotId } });
    const order = await this.orderRep.findOne(orderId);
    const teapot = await this.teapotRep.findOne(teapotId);
    order.orderSum -= cart.amount * teapot.price;
    teapot.amount += cart.amount;
    await this.cartRep.delete(cart);
    await this.teapotRep.update({ id: teapotId }, { amount: teapot.amount });
    await this.orderRep.update({ id: orderId }, { orderSum: order.orderSum });
    return {
      data: cart,
      message: 'Deleted cart',
      success: true,
    };
  }
}
