import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { StatusName } from '../schemas/status-name.enum';


export class UpdateUserDto{
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "First Name",
        required: false,
        default: "Валерий"
    })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "Second Name",
        required: false,
        default: "Самса"
    })
    surname?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User email adress",
        required: false,
        default: "example@gmail.com"
    })
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User password",
        required: false,
        default: "password"
    })
    password?:string;

    @IsDate()
    @IsOptional()
    @ApiProperty({
        description: "User birthday",
        required: false,
        default: "2002,01,01"
    })
    birthDate?:Date

    @IsEnum(StatusName)
    @IsOptional()
    @ApiProperty({
        description: "User status",
        required: false,
        default: StatusName.CLIENT
    })
    status?:StatusName;
}