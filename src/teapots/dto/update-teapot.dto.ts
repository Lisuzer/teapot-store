import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateTeapotDto {

    @ApiProperty({
        description: "Teapots amount",
        required: false,
        default: "4"
    })
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    amount?: number;

    @ApiProperty({
        description: "Teapot price",
        required: false,
        default: "1999,99"
    })
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({
        description: "Teapot image",
        required: false,
        default: "https://files.fm/thumb_show.php?i=ehe5qkm2j"
    })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    img?: string;
}