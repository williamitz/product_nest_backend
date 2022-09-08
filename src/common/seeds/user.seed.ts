import { Factory, Seeder } from "typeorm-seeding";
import { User } from '../../user/entities/user.entity';

export default class UserSeed implements Seeder {
    async run(factory: Factory): Promise<void> {
        
        await factory( User )().createMany(10);

    }
   
}