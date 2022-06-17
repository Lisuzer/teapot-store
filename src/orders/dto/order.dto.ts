import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { StatusName } from "../schemas/status-name.enum";


export class OrderDto {
    @ApiProperty({
        description: "Order create date",
        required: true,
        default: ""
    })
    @IsDate()
    @IsNotEmpty()
    orderDate: Date;


    @ApiProperty({
        description: "order sum",
        required: false,
        default: ""
    })
    @IsNumber()
    orderSum: number;


    @ApiProperty({
        description: "Current order status",
        required: true,
        default: "recived"
    })
    @IsEnum(StatusName)
    @IsNotEmpty()
    status: StatusName;


    @ApiProperty({
        description: "Order additional info",
        required: true,
        default: "Please give me one teapot for free(("
    })
    @IsString()
    @IsNotEmpty()
    orderAddInfo: string;


    @ApiProperty({
        description: "User id who create order",
        required: true,
        default: ""
    })
    @IsString()
    @IsNotEmpty()
    userId: string;


    @ApiProperty({
        description: "delivery id",
        required: true,
        default: ""
    })
    @IsString()
    @IsNotEmpty()
    deliveryId: string;
}