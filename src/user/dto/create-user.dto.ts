import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    email?: string;
    
    @IsString()
    @MinLength(6)
    @IsOptional()
    phon?: string;
        
}
