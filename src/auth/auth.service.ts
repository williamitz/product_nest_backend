import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bscrypt from 'bcrypt';


import { User } from '../user/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository( User )
    private readonly _userrepo: Repository<User>,

    private readonly _jwtsvc: JwtService
  ) {}

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
        ...userSaved,
        token: this.buildToken( { id: userSaved.id, email: userSaved.email } )
      };

    } catch (error) {
      throw new BadRequestException('Bad request to create user');
    }

  }
  
  async login( body: LoginUserDto ) {
    
    try {

      const { email, password } = body;

      const userFinded = await this._userrepo.findOne({
        where: { email },
        select: { email: true, password: true, id: true }
      });

      if( !userFinded )
        throw new UnauthorizedException('Invalid credentials (email)')
        
      if( userFinded && !bscrypt.compareSync( password, userFinded.password ) )
        throw new UnauthorizedException('Invalid credentials (password)')

      delete userFinded.password;

      return {
        ...userFinded,
        token: this.buildToken( { id: userFinded.id, email: userFinded.email } )
      }
      
    } catch (error) {
      throw new BadRequestException('Bad request to login user');
    }

  }

  async findUserBy( email: string ): Promise<User> {
    
    return await this._userrepo.findOne({ where: { email } });

  }

  buildToken( payload: IJwtPayload ): string {
    return this._jwtsvc.sign( payload );
  }
  
}
