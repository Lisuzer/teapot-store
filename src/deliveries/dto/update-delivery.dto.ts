import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateDeliveryDto {
    @ApiProperty({
        description: 'Delivery post number',
        required: false,
        default: '6',
    })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    postNumber?: number;

    @ApiProperty({
        description: 'Delivery adress',
        required: false,
        default: 'Sokolivska st. 69',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    adress?: string;
}