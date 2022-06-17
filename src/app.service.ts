import { Injectable } from '@nestjs/common';
import { HTTP_RESPONSE } from './interfaces/HTTP_RESPONSE.interface';

@Injectable()
export class AppService {
  ping(): HTTP_RESPONSE {
    return {
      data: null,
      message: 'Pong!',
      success: true,
    };
  }
}
