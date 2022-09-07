import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './environments/database.env';
import env from './environments/env';
import { envValidation } from './environments/env-validation';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      load: [env],
      validationSchema: envValidation
    }),

    TypeOrmModule.forRootAsync(databaseConfig)
  ],
})
export class AppModule {

  static port: number;

  constructor( private readonly configsvc: ConfigService ) {

    AppModule.port = +configsvc.getOrThrow('port');
  }

}
