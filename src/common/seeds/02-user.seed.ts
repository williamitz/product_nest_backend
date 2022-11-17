import { Factory, Seeder } from "typeorm-seeding";
import { User } from '../../user/entities/user.entity';
import { Country } from '../../country/entities/country.entity';

export default class UserSeed implements Seeder {
    async run(factory: Factory): Promise<void> {

        // const newCountry = await factory( Country )().create();
        
        await factory( User )()
        .map( async (user) => {
            
            user.country = { id: '12e5e187-696a-439d-b5ae-d5d1606ca2be' };

            return user;
        } )
        .createMany(10);
        
        await factory( User )()
        .map( async (record) => {

            record.id = 'ebb5fd4f-ff0f-4440-8538-25c43ce92d2f';
            record.fullName = 'Fulanito de tal';
            record.email = 'fulanito@gmail.com';
            record.country = { id: '12e5e187-696a-439d-b5ae-d5d1606ca2be' };

            return record;
        } ).create();
    }
   
}