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
        description: "Manufacturer country",
        required: false,
        default: "Ukraine"
    })
    country?: string;
}