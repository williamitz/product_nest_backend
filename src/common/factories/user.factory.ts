import { randEmail, randFullName, randPhoneNumber } from '@ngneat/falso';
import { define } from 'typeorm-seeding'
import { User } from '../../user/entities/user.entity';
import * as bscrypt from 'bcrypt';
 
define(User, () => {
    
    const newUser = new User();

    newUser.email     = randEmail();
    newUser.phone     = randPhoneNumber({countryCode: 'PE'});
    newUser.fullName  = randFullName();
    newUser.password  = bscrypt.hashSync( '123456Cq', 10 );
    newUser.google    = false;
    
    return newUser;
 });