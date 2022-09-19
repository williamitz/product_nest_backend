import { AuthModuleAsyncOptions } from "@nestjs/passport";
import { ConfigModule, ConfigService } from '@nestjs/config';

export const passportConfig: AuthModuleAsyncOptions = ({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],

    useFactory: ( _configsvc: ConfigService ) => ({
        defaultStrategy: _configsvc.getOrThrow('auth.strategy')
    })
})