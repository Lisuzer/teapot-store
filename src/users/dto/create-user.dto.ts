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
    name: string;

    @IsString()
    @IsNotEmpty()
    surname: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsDate()
    @IsNotEmpty()
    birthDate:Date

    @IsEnum(StatusName)
    @IsNotEmpty()
    status:StatusName;
}