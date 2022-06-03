import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class UpdateCartDto {
    @ApiProperty({
        description: 'Amount of teapots',
        required: true,
        default: '9',
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}