import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class PerchasedTeapotsDto {
    @ApiProperty({
        description: 'Id purchased teapot',
        required: true,
        default: '',
    })
    @IsNotEmpty()
    @IsString()
    teapotId: string;

    @ApiProperty({
        description: 'Amount of purchesad teapots',
        required: true,
        default: '2',
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}