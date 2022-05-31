import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class ManufacturerDto{

    @IsString()
    @ApiProperty({
        description: "Manufacturer name",
        required: true,
        default: "GoodTea"
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: "What country is the manufacturer from",
        required: true,
        default: "Ukrain"
    })
    country: string;
}