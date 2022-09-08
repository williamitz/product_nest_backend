import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = ({
    imports: [ ConfigModule ],
    useFactory:( configsvc: ConfigService ) => ({
      type: configsvc.getOrThrow<'mysql' | 'postgres'>('database.type'),
      host: configsvc.getOrThrow('database.host'),
      port: +configsvc.getOrThrow('database.port'),
      username: configsvc.getOrThrow('database.user'),
      password: configsvc.getOrThrow<string>('database.password'),
      database: configsvc.getOrThrow<string>('database.name'),

      synchronize: true,
      autoLoadEntities: true,

    }),

    inject: [ConfigService],
  });