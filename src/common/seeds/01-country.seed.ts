import { Factory, Seeder } from 'typeorm-seeding';
import { Country } from '../../country/entities/country.entity';
import { User } from '../../user/entities/user.entity';


export default class CountrySeed implements Seeder {

    async run( factory: Factory ): Promise<void> {

        await factory( Country )()
            .map( async ( e ) => {
                
                e.id             = '12e5e187-696a-439d-b5ae-d5d1606ca2be';
                e.nameCountry    = 'Perú';
                e.isoAlphaThree  = 'PER';
                e.moneyCode      = 'PEN';
                e.moneySymbol    = 'S/';
                e.timeZone       = 'America/Lima';
                e.prefixPhone    = '+51';
                
                // e.userCreate     = await factory( User )().create();
                e.createAt       = new Date( );

                return e;

            }).create();
    }


}