import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First Name',
    required: true,
    default: 'Валерий',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Second Name',
    required: true,
    default: 'Самса',
  })
  surname: string;

  @IsMobilePhone('uk-UA')
  @IsNotEmpty()
  @ApiProperty({
    description: 'User phone number',
    required: true,
    default: "+380660771585"
  })
  mobPhone: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email adress',
    required: true,
    default: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    required: true,
    default: 'password',
  })
  password: string;
}
