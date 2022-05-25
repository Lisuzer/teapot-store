import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeapotsModule } from './teapots/teapots.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TeapotsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
