import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { typeOrmConfig, envValidation } from './environments';
import env from './environments/env-config';

@Module({
    
    imports: [
        
        ConfigModule.forRoot({
            load: [env],
            validationSchema: envValidation
        }),

        TypeOrmModule.forRootAsync(typeOrmConfig)
    ],
    exports: [
        TypeOrmModule,
        ConfigModule
    ]

})
export class CommonModule {}
