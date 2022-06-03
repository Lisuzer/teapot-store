import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturers.entity';
import { Teapot } from './schemas/teapots.entity';
import { TeapotsController } from './teapots.controller';
import { TeapotsService } from './teapots.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teapot, Manufacturer])],
  controllers: [TeapotsController],
  providers: [TeapotsService],
})
export class TeapotsModule { }
