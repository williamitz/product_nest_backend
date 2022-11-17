import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsString()
    @Matches(
        /^[0-9+\s]{6,15}$/, {
        message: 'Teléfono inválido +51 000 000 000'
    })
    phone: string;

}
