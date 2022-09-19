import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository( User )
    private readonly _userrepo: Repository<User>,
    private readonly _jwtsvc: JwtService
  ) {}

  async create( body: CreateUserDto) {
    
    try {
      
      let { password, ...user } = body;

      let newUser = this._userrepo.create({
        ...user,
        password: bcrypt.hashSync( password, 10 )
      });

      const userSaved = await this._userrepo.save( newUser );

      delete userSaved.password;

      return {
        ...userSaved,
        token: this.buildToken( { id: userSaved.id, email: userSaved.email } )
      };

    } catch (error) {
      console.log('error',error);
      throw new BadRequestException('Bad request to create user');
    }
    
  }

  buildToken( payload: Partial<User> ) {
    return this._jwtsvc.sign( payload );
  }

  async findAll() {
    
    try {
      
      return await this._userrepo.find();

    } catch (error) {
      throw new BadRequestException('Bad request');
    }

  }

  async findOne(id: string) {
    
    try {
      return await this._userrepo.findOne({ where: {id} });
    } catch (error) {
      throw new BadRequestException( 'Bad request find by id' );
    }
    
  }

  async update( id: string, body: UpdateUserDto ) {
    try {

      let userToUpdate = await this._userrepo.preload( { id, ...body } );

      if( !userToUpdate ) throw new NotFoundException(`Not found user by id: ${id}`);

      return this._userrepo.save( userToUpdate );
      
    } catch (error) {
      throw new BadRequestException('Bad request to update user');
    }
  }

  async remove(id: string) {
    try {
      
      await this._userrepo.delete({id});

      return `This action removes a #${id} user`;
    } catch (error) {
      throw new BadRequestException('Bad request to delete user');
    }
  }
}
