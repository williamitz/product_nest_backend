import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig: JwtModuleAsyncOptions = ({
    imports   : [ ConfigModule ],
    inject    : [ ConfigService ],
    useFactory: ( _configsvc: ConfigService ) => ({
        secret: _configsvc.getOrThrow('auth.jwt_secret'),
        signOptions: {
            expiresIn: _configsvc.getOrThrow('auth.jwt_expires_in')
        }
    })
});