import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../interfaces/roles.enum';
// import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthUserGuard implements CanActivate {

  constructor( private readonly _reflector: Reflector ) {}

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> {

    const roles = this._reflector.get<ERole[]>( 'roles', context.getHandler() );

    if( !roles || roles?.length == 0 ) return true;

    const request = context.switchToHttp().getRequest();
    
    if( !request.user )
      throw new InternalServerErrorException('Not found user by request *AuthGuard');
    
    // const {  } = request.user as User;

    return true;
  }
}
