import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CartDto {
    @ApiProperty({
        description: 'Order Id',
        required: true,
        default: '9',
    })
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @ApiProperty({
        description: 'Teapot Id',
        required: true,
        default: '9',
    })
    @IsString()
    @IsNotEmpty()
    teapotId: string;

    @ApiProperty({
        description: 'Amount of teapots',
        required: true,
        default: '9',
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}