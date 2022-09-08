import { randEmail, randPhoneNumber } from '@ngneat/falso';
import { define } from 'typeorm-seeding'
import { User } from '../../user/entities/user.entity';
 
define(User, () => { 
    
    const newUser = new User();

    newUser.email = randEmail();
    newUser.phone = randPhoneNumber({countryCode: 'PE'});
    
    return newUser;
 });