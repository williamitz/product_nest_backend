import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,

    UserModule,

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
