import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { StatusName } from '../schemas/status-name.enum';


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "First Name",
        default: "Валерий"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:"Second Name",
        default:"Самса"
    })
    surname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User email adress",
        default: "example@gmail.com"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User password",
        default: "password"
    })
    password:string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        description: "User birthday",
        default: "2002,01,01"
    })
    birthDate:Date

    @IsEnum(StatusName)
    @IsNotEmpty()
    @ApiProperty({
        description: "User status",
        default: "user"
    })
    status:StatusName;
}