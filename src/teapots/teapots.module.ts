import { Module } from '@nestjs/common';
import { TeapotsController } from './teapots.controller';
import { TeapotsService } from './teapots.service';

@Module({
  controllers: [TeapotsController],
  providers: [TeapotsService]
})
export class TeapotsModule {}
