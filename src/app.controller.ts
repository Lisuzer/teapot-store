import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HTTP_RESPONSE } from './interfaces/HTTP_RESPONSE.interface';

@ApiTags('index')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'Server health check' })
  @Get('/ping')
  getHello(): HTTP_RESPONSE {
    return this.appService.ping();
  }
}
