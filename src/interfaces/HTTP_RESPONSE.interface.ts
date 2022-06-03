import { ApiProperty } from '@nestjs/swagger';

export class HTTP_RESPONSE {
  @ApiProperty()
  data: any;
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
}
