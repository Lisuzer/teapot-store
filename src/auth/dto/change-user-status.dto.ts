import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserStatus } from "../schemas/user-status.enum";


export class ChangeUserStatusDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsEnum(UserStatus)
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User status',
        required: false,
        default: UserStatus.CLIENT,
    })
    status?: UserStatus;
}