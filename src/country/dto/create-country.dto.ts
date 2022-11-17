import { IsString, Length, Matches } from "class-validator";
import { fullTextPatt, timeZonePatt, isoThreePatt, codePatt, symbolPatt, prefixPhonePatt } from '../../common/helpers/regexp.helper';

export class CreateCountryDto {
    
    @IsString()
    @Length( 3, 100, { message: 'Mínimo 03 letras y máximo 100' } )
    @Matches(
        fullTextPatt,
        { message: 'Solo letras' }
    )
    readonly nameCountry: string;

    @IsString()
    @Length( 6, 45, { message: 'Mínimo 06 letras y máximo 45' } )
    @Matches(
        timeZonePatt,
        { message: 'Solo letras, sin espacios y sin signos de puntuación' }
    )
    readonly timeZone: string;

    @IsString()
    @Length( 3, 3, { message: '03 letras' } )
    @Matches(
        isoThreePatt,
        { message: 'Solo letras sin signos de puntuación' }
    )
    readonly isoAlphaThree: string;

    @IsString()
    @Length( 2, 5, { message: 'Mínimo 2 letras y máximo 5' } )
    @Matches(
        codePatt,
        { message: 'Solo letras sin signos de puntuación' }
    )
    readonly moneyCode: string;

    @IsString()
    @Length( 2, 4, { message: 'Mínimo 2 letras y máximo 4' } )
    @Matches(
        symbolPatt,
        { message: 'Solo letras y $ . /' }
    )
    readonly moneySymbol: string;

    @IsString()
    @Length( 2, 5, { message: 'Mínimo 2 caracteres y máximo 5' } )
    @Matches(
        prefixPhonePatt,
        { message: 'Solo números y +' }
    )
    readonly prefixPhone: string;

}
