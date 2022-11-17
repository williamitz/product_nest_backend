import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class PagerDto {
    
    @Type( () => Number )
    @IsInt()
    @Min(0)
    @IsOptional()
    limit: number;
    

    @Type( () => Number )
    @IsInt()
    @Min(0)
    @IsOptional()
    offset: number;

    @IsString()
    @IsOptional()
    filter: string;

    @IsBoolean()
    @IsIn([true, false])
    @IsOptional()
    @Type( () => Boolean )
    active: boolean;
}