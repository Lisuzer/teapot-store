import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateManufacturersDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        description: "Manufacturer name",
        required: false,
        default: "GoodTea"
    })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        description: "What country is the manufacturer from",
        required: false,
        default: "Ukrain"
    })
    country?: string;
}