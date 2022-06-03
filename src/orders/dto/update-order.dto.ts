import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { StatusName } from "../schemas/status-name.enum";


export class UpdateOrderDto {
    @ApiProperty({
        description: "Current order status",
        required: true,
        default: "recived"
    })
    @IsEnum(StatusName)
    @IsNotEmpty()
    status: StatusName;
}