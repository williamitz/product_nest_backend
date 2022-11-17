import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export class CreateProductDto {

    @IsOptional()
    id: string;
    
    @IsString({
        message: 'No se envio el campo nombre producto (name)'
    })
    name: string;
    
    @IsBoolean()
    @Type( () => Boolean )
    readonly available: boolean;

    @IsNumber()
    @Type( () => Number )
    readonly price: number;

    @IsString()
    readonly urlImg: string;
    
    @IsOptional()
    readonly publicId: string;

    @IsOptional()
    readonly signature: string;

}
