import { OmitType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ManufacturerDto } from "./manufacturer.dto";


export class UpdateManufacturersDto extends OmitType(ManufacturerDto, ["name", "country"] as const) {
    @IsOptional()
    name?: string;

    @IsOptional()
    country?: string;
}