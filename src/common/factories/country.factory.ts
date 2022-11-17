import { randCountry, randCountryCode, randCurrencyCode, randCurrencySymbol, randText, randTimeZone } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { Country } from '../../country/entities/country.entity';


define( Country, () => {
    
    const newCountry = new Country();

    newCountry.nameCountry = randCountry();
    newCountry.timeZone = randTimeZone();
    newCountry.isoAlphaThree = randCountryCode();
    newCountry.moneyCode = randCurrencyCode();
    newCountry.moneySymbol = randCurrencySymbol();
    newCountry.prefixPhone = '+51';
    newCountry.createAt = new Date();

    return newCountry;

});