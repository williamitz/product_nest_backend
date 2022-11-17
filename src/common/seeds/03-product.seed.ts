import { Factory, Seeder } from 'typeorm-seeding';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Country } from '../../country/entities/country.entity';

export default class ProductSeed implements Seeder {

    async run( factory: Factory ): Promise<void> {

        const user = await factory( User )()
        .map( async (user) => {
                
            user.country = await factory( Country )().create();
            return user;
        } )
        .create();

        await factory( Product )()
        .map( async (newp) => {
            
            newp.user = { id: user.id };

            return newp;
        } )
        .createMany( 10 );
    }
    
}