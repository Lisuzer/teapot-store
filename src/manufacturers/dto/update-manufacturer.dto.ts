import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class UpdateManufacturersDto{
    @IsString()
    @ApiProperty({
        description: "Manufacturer name",
        required: false,
        default: "GoodTea"
    })
    name?: string;

    @IsString()
    @ApiProperty({
        description: "What country is the manufacturer from",
        required: false,
        default: "Ukrain"
    })
    country?: string;
}