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
        required: true,
        default: "Валерий"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:"Second Name",
        required: true,
        default:"Самса"
    })
    surname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User email adress",
        required: true,
        default: "example@gmail.com"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "User password",
        required: true,
        default: "password"
    })
    password:string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        description: "User birthday",
        required: true,
        default: "2002,01,01"
    })
    birthDate:Date

    @IsEnum(StatusName)
    @IsNotEmpty()
    @ApiProperty({
        description: "User status",
        required: true,
        default: StatusName.CLIENT
    })
    status:StatusName;
}