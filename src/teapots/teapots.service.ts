import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/carts/carts.service';
import { HTTP_RESPONSE } from 'src/interfaces/HTTP_RESPONSE.interface';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturers.entity';
import { PaginationOptions } from 'src/pagination/pagination';
import { ILike, Repository } from 'typeorm';
import { CreateTeapotDto } from './dto/cteate-teapot.dto';
import { UpdateTeapotDto } from './dto/update-teapot.dto';
import { Teapot } from './schemas/teapots.entity';

@Injectable()
export class TeapotsService {
  constructor(
    @InjectRepository(Teapot)
    private teapotRep: Repository<Teapot>,
    @InjectRepository(Manufacturer)
    private manufacturerRep: Repository<Manufacturer>,
    private cartService: CartService,
  ) {}

  async getAll(): Promise<HTTP_RESPONSE> {
    const teapots = await this.teapotRep.find({
      join: {
        alias: 'teapot',
        leftJoinAndSelect: {
          manufacturer: 'teapot.manufacturer',
        },
      },
    });
    if (!teapots) {
      throw new BadRequestException('Teapots not found');
    }
    return {
      data: teapots,
      message: 'All teapots',
      success: true,
    };
  }

  async paginate(options: PaginationOptions): Promise<HTTP_RESPONSE> {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const keyword = options.keyword || '';
    const skip = page * limit - limit;
    const teapots = await this.teapotRep.find({
      where: {
        title: ILike(`%${keyword}%`),
      },
      join: {
        alias: 'teapot',
        leftJoinAndSelect: {
          manufacturer: 'teapot.manufacturer',
        },
      },
      order: {
        amount: 'DESC',
      },
      skip: skip,
      take: limit,
    });
    if (!teapots) {
      throw new BadRequestException('Teapots not found');
    }
    return {
      data: teapots,
      message: 'All teapots',
      success: true,
    };
  }

  async getById(id: string): Promise<HTTP_RESPONSE> {
    const teapot = await this.teapotRep.findOne({
      where: { id },
      join: {
        alias: 'teapot',
        leftJoinAndSelect: {
          manufacturer: 'teapot.manufacturer',
        },
      },
    });
    if (!teapot) {
      throw new HttpException('Teapot not found', HttpStatus.BAD_REQUEST);
    }
    return {
      data: teapot,
      message: 'Teapot by id ' + id,
      success: true,
    };
  }

  async delete(id: string): Promise<HTTP_RESPONSE> {
    const teapot = await this.teapotRep.findOne(id);
    if (!teapot) {
      throw new HttpException('Teapot not found', HttpStatus.BAD_REQUEST);
    }

    const carts = await this.cartService.findByTeapot(teapot);
    if (carts.data.length) {
      teapot.amount = 0;
      await this.update(id, { amount: teapot.amount });
    } else {
      await this.teapotRep.delete(teapot.id);
    }

    return {
      data: teapot,
      message: 'Deleted teapot',
      success: true,
    };
  }
  async create(dto: CreateTeapotDto): Promise<HTTP_RESPONSE> {
    const { manufacturer, title, ...rest } = dto;
    const manufacturerEntity = await this.manufacturerRep.findOne(manufacturer);
    if (!manufacturerEntity) {
      throw new HttpException('Manufacturer not found', HttpStatus.NOT_FOUND);
    }
    for (let teapot of manufacturerEntity.teapots) {
      if (teapot.title == title) {
        throw new HttpException(
          'Title can`t overlap existing ones',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const teapot = await this.teapotRep.save({
      manufacturer: manufacturerEntity,
      title,
      ...rest,
    });

    const createdTeapot = await this.teapotRep.findOne(teapot.id);

    return {
      data: createdTeapot,
      message: 'Created teapot',
      success: true,
    };
  }

  async update(id: string, dto: UpdateTeapotDto): Promise<HTTP_RESPONSE> {
    try {
      const teapot = await this.teapotRep.findOne(id);
      if (!teapot) {
        throw new HttpException('Teapot not found', HttpStatus.BAD_REQUEST);
      }

      await this.teapotRep.update(id, dto);
      const updatedTeapot = await this.teapotRep.findOne(id);
      return {
        data: updatedTeapot,
        message: 'Updated teapot',
        success: true,
      };
    } catch (e) {
      return {
        data: null,
        message: e.message,
        success: false,
      };
    }
  }
}
