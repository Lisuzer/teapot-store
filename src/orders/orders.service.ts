import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/schemas/users.entity';
import { CartService } from 'src/carts/carts.service';
import { Delivery } from 'src/deliveries/schemas/deliveries.entity';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { ILike, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/orders.entyty';
import { StatusName } from './schemas/status-name.enum';
const moment = require('moment');

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRep: Repository<Order>,
    private cartService: CartService,
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Delivery)
    private deliveryRep: Repository<Delivery>,
    private mailerService: MailerService
  ) { }

  async create(dto: CreateOrderDto): Promise<HTTP_RESPONSE> {
    const orderDate = moment().format('YYYY-MM-DD');
    const { userId, deliveryId, orderInfo, orderAddInfo } = dto;
    try {
      const userEntity = await this.userRep.findOne(userId);
      const deliveryEntity = await this.deliveryRep.findOne(deliveryId);
      const addInfoToOrder = orderAddInfo
        ? orderAddInfo
        : 'No add info for this order';
      const order = await this.orderRep.save({
        orderDate,
        orderAddInfo: addInfoToOrder,
        user: userEntity,
        delivery: deliveryEntity,
      });
      const cartResult = await this.cartService.create({
        orderId: order.id,
        orderInfo: orderInfo,
      });
      if (!cartResult.success) {
        await this.orderRep.delete(order.id);
        throw new HttpException("Can't...", HttpStatus.BAD_REQUEST);
      }
      const orderEntity = await this.orderRep.findOne({
        where: { id: order.id },
      });
      return {
        data: orderEntity,
        message: 'Created order, carts',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't create order",
        success: false,
      };
    }
  }

  async update(id: string, dto: UpdateOrderDto): Promise<HTTP_RESPONSE> {
    try {
      if (dto.status == StatusName.DELiVERIED) {
        const order = await this.orderRep.findOne({
          where: { id },
          join: {
            alias: 'order',
            leftJoinAndSelect: {
              user: 'order.user',
            },
          },
        });
        await this.mailerService.sendMail({
          to: order.user.email,
          subject: "Your order",
          template: './newOrderStatus',
          context: {
            name: order.user.name,
            surname: order.user.surname,
            status: dto.status,
          },
        });
      }
      await this.orderRep.update(id, dto);
      const updatedOrder = await this.orderRep.findOne(id);
      return {
        data: updatedOrder,
        message: 'Updated order',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't update order",
        success: false,
      };
    }
  }

  async delete(id: string): Promise<HTTP_RESPONSE> {
    try {
      const order = await this.orderRep.findOne(id);
      await this.orderRep.delete(id);
      return {
        data: order,
        message: 'Deleted order',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't delete order",
        success: false,
      };
    }
  }

  async findById(id: string): Promise<HTTP_RESPONSE> {
    try {
      const order = await this.orderRep.findOne(id);
      if (!order) {
        throw new HttpException(
          'No order with this id',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        data: order,
        message: 'Finded order',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't find order",
        success: false,
      };
    }
  }

  async findAll(filter: string): Promise<HTTP_RESPONSE> {
    const howToSort = (filter == 'deliveried' || filter == 'colsed') ? 'DESC' : 'ASC';
    try {
      const orders = await this.orderRep.find({
        where: {
          status: ILike(`%${filter}%`)
        },
        join: {
          alias: 'order',
          leftJoinAndSelect: {
            user: 'order.user'
          }
        },
        order: {
          orderDate: howToSort
        }
      });
      if (!orders) {
        throw new HttpException(
          'No orders in database',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        data: orders,
        message: 'Finded orders',
        success: true,
      };
    } catch (e) {
      return {
        data: e,
        message: "Can't find orders",
        success: false,
      };
    }
  }

  async getOrder({ user }: any) {
    try {
      const result = await this.orderRep.find({ where: { user: user.id } });
      return { data: { order: result }, message: 'User orders', success: true };
    } catch (e) {
      return {
        data: null,
        success: false,
        message: e,
      };
    }
  }
}
