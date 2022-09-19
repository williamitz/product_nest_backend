import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    CommonModule,

    UserModule,

    AuthModule,

    /**
     * 
     * more modules
     * 
     */
  ],
})
export class AppModule {

  static port: number;

  constructor( private readonly configsvc: ConfigService ) {

    AppModule.port = +configsvc.getOrThrow('port');
  }

}
