import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from "passport-jwt";

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtEstrategy extends PassportStrategy( Strategy ) {
    
    constructor(
        _configsvc: ConfigService,
        private readonly _authsvc: AuthService
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configsvc.getOrThrow('auth.jwt_secret')
        })
    }

    async validate( payload: IJwtPayload ) {
        
        const { email } = payload;

        const userFinded = await this._authsvc.findUserBy( email );

        if( !userFinded )
            throw new UnauthorizedException('Invalid credential, not found user');

        // if( userFinded && userFinded. )

        return userFinded;
    } 

}