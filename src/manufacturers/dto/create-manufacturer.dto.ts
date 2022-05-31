import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ManufacturerDto } from "./manufacturer.dto";


export class CreateManufacturerDto extends ManufacturerDto{}