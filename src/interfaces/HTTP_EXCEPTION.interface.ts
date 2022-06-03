import { ApiProperty } from '@nestjs/swagger';

export class HTTP_EXCEPTION {
  @ApiProperty()
  response: any;
  @ApiProperty()
  path: string;
  @ApiProperty()
  success: boolean;
}
