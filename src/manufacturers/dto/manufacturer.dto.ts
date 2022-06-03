import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ManufacturerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Manufacturer name',
    required: true,
    default: 'GoodTea',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'What country is the manufacturer from',
    required: true,
    default: 'Ukraine',
  })
  country: string;
}
