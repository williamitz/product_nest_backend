import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { passportConfig } from './passport/passport.config';
import { jwtConfig } from './passport/jwt.config';
import { JwtEstrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtEstrategy],
  imports: [
    
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.registerAsync( passportConfig ),
    JwtModule.registerAsync( jwtConfig ),


  ],
  exports: [
    
    PassportModule,
    JwtModule,

    JwtEstrategy
  ]
})
export class AuthModule {}
