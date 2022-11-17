import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [

    CommonModule,

    UserModule,
    ProductModule,
    AuthModule,
    CountryModule,

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
