import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TeapotDto {

    @ApiProperty({
        description: "Teapot title",
        required: true,
        default: "DCP300"
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: "Production start date",
        required: true,
        default: "2021"
    })
    @IsNotEmpty()
    @IsNumber()
    year: number;

    @ApiProperty({
        description: "Teapot weight",
        required: true,
        default: "2,5"
    })
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @ApiProperty({
        description: "Teapot matirial",
        required: true,
        default: "Metal"
    })
    @IsNotEmpty()
    @IsString()
    material: string;

    @ApiProperty({
        description: "Teapot capacity",
        required: true,
        default: "1,8"
    })
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @ApiProperty({
        description: "Teapot features",
        required: true,
        default: "Bluetooth, Wifi"
    })
    @IsNotEmpty()
    @IsString()
    features: string;

    @ApiProperty({
        description: "Teapots amount",
        required: true,
        default: "4"
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty({
        description: "Teapot price",
        required: true,
        default: "1999,99"
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: "Teapot image",
        required: true,
        default: "https://files.fm/thumb_show.php?i=ehe5qkm2j"
    })
    @IsNotEmpty()
    @IsString()
    img: string;

    @ApiProperty({
        description: "Manufacturer id",
        required: true,
        default: ""
    })
    @IsNotEmpty()
    @IsString()
    manufacturerId: string;
}