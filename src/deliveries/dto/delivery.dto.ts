import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeliveryDto {
    @ApiProperty({
        description: 'Delivery post number',
        required: true,
        default: '9',
    })
    @IsNumber()
    @IsNotEmpty()
    postNumber: number;

    @ApiProperty({
        description: 'Delivery adress',
        required: true,
        default: 'Roganska st. 69',
    })
    @IsString()
    @IsNotEmpty()
    adress: string;

    @ApiProperty({
        description: 'Delivery city',
        required: true,
        default: 'Kharkiv',
    })
    @IsString()
    @IsNotEmpty()
    cityName: string;
}