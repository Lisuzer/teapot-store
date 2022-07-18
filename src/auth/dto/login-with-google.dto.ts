import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithGoogleDto {
  @ApiProperty({
    required: true,
    default: ''
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    default: ''
  })
  @IsString()
  @IsNotEmpty()
  googleId: string;
}