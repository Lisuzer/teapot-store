import { PickType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { OrderDto } from "./order.dto";
import { PerchasedTeapotsDto } from "./perchased-teapots";


export class CreateOrderDto extends PickType(OrderDto, ['userId', 'deliveryId', 'orderAddInfo'] as const) {
    @ApiProperty({
        description: 'teapot id & amount',
        required: true,
        default: ''
    })
    @IsNotEmpty()
    orderInfo: PerchasedTeapotsDto[];
}