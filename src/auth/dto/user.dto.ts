import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { UserStatus } from '../../auth/schemas/user-status.enum';

export class UserDto {
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

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User birthday',
    required: true,
    default: '2002,01,01',
  })
  birthDate: Date;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'User status',
    required: true,
    default: UserStatus.CLIENT,
  })
  status: UserStatus;
}
