import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

export const JwtUser = createParamDecorator( (data: any, ctx: ExecutionContext): User => {
    
    const req = ctx.switchToHttp().getRequest();

    const user = req?.user;

    if( !user )
        throw new InternalServerErrorException('Not found user by request ');

    return user;

} );
