import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { QueryFailedError, Repository } from 'typeorm';
import * as bscrypt from 'bcrypt';


import { User } from '../user/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto, LoginGoogle } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

// const {OAuth2Client} = require('google-auth-library');

import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

  private _clientId = '';

  constructor(
    @InjectRepository( User )
    private readonly _userrepo: Repository<User>,

    private readonly _jwtsvc: JwtService,

    private readonly _configsvc: ConfigService
  ) {
    this._clientId = this._configsvc.getOrThrow('google.client_id');
  }

  async create( body: RegisterUserDto ) {
    
    try {
      
      const { password, ...user } = body;

      const newUser = this._userrepo.create({
        ...user,
        password: bscrypt.hashSync( password, 10 )
      });

      const userSaved = await this._userrepo.save( newUser );

      delete userSaved.password;

      return {
        response: {
          ok: true,
          message: 'Bienvenido'
        },
        data: {...userSaved},
        token: this.buildToken( { id: userSaved.id, email: userSaved.email } )
      };

    } catch (error: any) {

      let { driverError } = error as QueryFailedError;

      if( driverError?.code == '23505' ) {
        throw new BadRequestException( { ok: false, message: 'Ya existe un usuario conm el key'}   );
      }

      throw new BadRequestException( { ok: false, message: 'Ocurrió un error inesperado' } );
    }

  }
  
  async login( body: LoginUserDto ) {
    
    try {

      const { email, password } = body;

      const userFinded = await this._userrepo.findOne({
        where: { email },
        select: { email: true, password: true, id: true, fullName: true, phone: true }
      });

      if( !userFinded )
        return new UnauthorizedException('Invalid credentials (email)')
        
      if( userFinded && !bscrypt.compareSync( password, userFinded.password ) )
        return new UnauthorizedException('Invalid credentials (password)')

      delete userFinded.password;

      return {
        response: {
          ok: true,
          message: 'Bienvenido'
        },
        data: {...userFinded},
        token: this.buildToken( { id: userFinded.id, email: userFinded.email } )
      }
      
    } catch (error) {

      console.log('error === ', error);
      throw new BadRequestException( { ok: false, message: 'Bad request to login user' } );
    }

  }

  async loginWithGoogle( body: LoginGoogle ) {
    try {

      const client = new OAuth2Client( this._clientId );

      const ticket = await client.verifyIdToken({
          idToken: body.token,
          audience: this._clientId,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email = '', email_verified = false } = ticket.getPayload();

      
      const userFinded = await this._userrepo.findOne(
        { where: { email }, select: { id: true, fullName: true, email: true, google: true, phone: true } } 
      );
      
      if( !userFinded )
        return new NotFoundException( { ok: false, message: 'No se encontró usuario, por favor registrese' } );

      if( !userFinded.google ) {
        return new BadRequestException( { ok: false, message: 'Su usuario no ingresa con google, ingrese usuario y contraseña' } );
      }

      return {
        response: {
          ok: true,
          message: 'Bienvenido'
        },
        data: {...userFinded},
        token: this.buildToken( { id: userFinded.id, email: userFinded.email } )
      }
      
    } catch (error) {
      console.log('loginWithGoogle service catch', error);
      throw new BadRequestException('Error with auth google');
       
    }
  }

  async singinWithGoogle( body: LoginGoogle ) {
    try {

      const client = new OAuth2Client( this._clientId );

      const ticket = await client.verifyIdToken({
          idToken: body.token,
          audience: this._clientId,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email = '', name: fullName, picture, email_verified = false } = ticket.getPayload();

      
      const userFinded = await this._userrepo.findOne(
        { where: { email }, select: { id: true, fullName: true, email: true, google: true, phone: true } } 
      );
      
      if( userFinded )
        return new NotFoundException( { ok: false, message: 'Ya existe un usuario registrado con este email' } );

      let buildUser = this._userrepo.create(
        {
          email,
          fullName,
          google: true,
          password: 'xd',
          phone: ''
        }
      );

      let newUser = await this._userrepo.save( buildUser );

      delete newUser.password;


      return {
        response: {
          ok: true,
          message: 'Bienvenido'
        },
        data: {...newUser},
        token: this.buildToken( { id: newUser.id, email: newUser.email } )
      }
      
    } catch (error) {
      throw new BadRequestException( { ok: false, message: 'Error with auth google' });
    }
  }

  async findUserBy( email: string ): Promise<User> {
    
    return await this._userrepo.findOne({ where: { email } });

  }

  buildToken( payload: IJwtPayload ): string {
    return this._jwtsvc.sign( payload );
  }
  
}
