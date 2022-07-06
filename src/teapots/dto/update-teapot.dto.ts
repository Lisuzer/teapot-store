import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeapotDto {
  @ApiProperty({
    description: 'Teapots amount',
    required: false,
    default: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'Teapot price',
    required: false,
    default: 1999.9,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 'https://files.fm/thumb_show.php?i=ehe5qkm2j',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({
    description: 'Teapot title',
    required: false,
    default: 'abobus',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 2019,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 1.5,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 'metal',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  material?: string;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 1.5,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({
    description: 'Teapot image',
    required: false,
    default: 'Wifi, Bluetooth',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  features?: string;
}
