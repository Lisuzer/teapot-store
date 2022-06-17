import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { PerchasedTeapotsDto } from "src/orders/dto/perchased-teapots";

export class CreateCartDto {
    @ApiProperty({
        description: 'teapot id & amount',
        required: true,
        default: ''
    })
    @IsNotEmpty()
    orderInfo: PerchasedTeapotsDto[];


    @ApiProperty({
        description: 'Order Id',
        required: true,
        default: '',
    })
    @IsString()
    @IsNotEmpty()
    orderId: string;
 }