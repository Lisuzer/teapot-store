import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First Name',
    required: false,
    default: 'Валерий',
  })
  name?: string;

  @IsMobilePhone('uk-UA')
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User phone number',
    required: false,
    default: 'Валерий',
  })
  mobPhone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Second Name',
    required: false,
    default: 'Самса',
  })
  surname?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email adress',
    required: false,
    default: 'example@gmail.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    required: false,
    default: 'password',
  })
  password?: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User birthday',
    required: false,
    default: '2002,01,01',
  })
  birthDate?: Date;
}
