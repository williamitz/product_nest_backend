import { BadRequestException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export const handleError = ( error: any, messageError: string = '' ) => {

    console.log('error === ', error);

    let { driverError } = error as QueryFailedError;

    if( driverError?.code == '23505' ) {
        throw new BadRequestException( { ok: false, message: `${ messageError } ${ driverError?.detail }`  }   );
    }

    throw new BadRequestException({
        ok: false,
        message: 'Badrequest exception'
    });

}
