import {
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { StatusName } from '../schemas/status-name.enum';


export class CreateUserDto{
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    surname: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password:string;

    @IsDate()
    @IsOptional()
    birthDate:Date

    @IsEnum(StatusName)
    @IsOptional()
    status:StatusName;
}