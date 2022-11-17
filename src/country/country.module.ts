import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { AuthModule } from '../auth/auth.module';
import { Country } from './entities/country.entity';

@Module({
  controllers: [
    CountryController
  ],
  providers: [
    CountryService
  ],
  imports: [
    TypeOrmModule.forFeature( [ Country ] ),
    AuthModule
  ],
  exports: [
    TypeOrmModule
  ]
})
export class CountryModule {}
