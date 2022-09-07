import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = ({
    imports: [ ConfigModule ],
    useFactory:( configsvc: ConfigService ) => ({
      type: configsvc.getOrThrow<any>('database.type'),
      host: configsvc.getOrThrow('database.host'),
      port: +configsvc.getOrThrow('database.port'),
      username: configsvc.getOrThrow('database.user'),
      password: configsvc.getOrThrow<string>('database.password'),
      database: configsvc.getOrThrow<string>('database.name'),

      synchronize: true,
      autoLoadEntities: true

    }),

    inject: [ConfigService],
  });