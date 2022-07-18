import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class SearchTeapotsFilters {
    @ApiProperty({
        required: false,
        description: 'Search keyword',
        default: ''
    })
    @IsString()
    @IsOptional()
    keyword?: string;

    @ApiProperty({
        required: false,
        description: 'Sort by this field',
        default: ''
    })
    @IsString()
    @IsOptional()
    sortBy?: string;

    @ApiProperty({
        required: false,
        description: 'ASC or DESC',
        default: ''
    })
    @IsString()
    @IsOptional()
    howSort?: string;

    @ApiProperty({
        required: false,
        description: 'Manufacturer name',
        default: ''
    })
    @IsString()
    @IsOptional()
    manufacturerName?: string;
}