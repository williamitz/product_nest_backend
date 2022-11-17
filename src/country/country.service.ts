import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';

import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { User } from '../user/entities/user.entity';
import { handleError } from '../common/helpers/handleError.helper';
import { currentDate } from '../common/helpers/moment.helper';
import { PagerDto } from '../common/dto/pager.dto';

@Injectable()
export class CountryService {

  constructor(
    @InjectRepository( Country )
    private readonly _countryrepo: Repository<Country>
  ) {}

  async create( body: CreateCountryDto, jwtUser: Partial<User> ) {
    
    try {
      
      const buildCountry = this._countryrepo.create({
        ...body,
        userCreate: { id: jwtUser.id },
        createAt: new Date( currentDate() )
      });

      const newCountry = await this._countryrepo.save( buildCountry );

      return {
        response: { ok: true },
        data: { ...newCountry },
      };

    } catch (error) {
      handleError( error, 'Ya existe un país con esta zona horaria o código de 3 letras' );
    }

  }

  async findAll( query: PagerDto ) {
    try {

      const { offset = 0, limit = 10, filter = '', active = true } = query;

      let where: FindOptionsWhere<Country> = {
        active
      };

      if( filter != '' ) {
        where.nameCountry = Like( filter );
      }

      let skip = offset;
      let take = limit;

      if( offset == 0 ) {
        skip = null;
        take = null;
      }

      console.log('where === ', where);

      const [ records, total ] = await Promise.all([
        
        await this._countryrepo.find({ where, skip, take }),
        
        offset == 0 ? 0 : await this._countryrepo.count({ where })

      ]);

      return {
        response: { ok: true },
        data: [...records],
        total
      };
      
    } catch (error) {
      handleError( error );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(id: string, body: UpdateCountryDto, user: Partial<User>) {
    try {

      const preCountry = await this._countryrepo.preload({
        id,
        ...body,
        userUpdate: { id: user.id },
        updateAt: new Date( currentDate() )
      });

      if( !preCountry ) 
        throw new NotFoundException({ ok: false, message: `No se encontró país con id: ${ id }` });
      
      const newCountry = await this._countryrepo.save( preCountry );

      return {
        response: { ok: true },
        data: { ...newCountry },
      };
      
    } catch (error) {
      handleError( error, 'Ya existe un país con esta zona horaria o código de 3 letras' );
    }
  }

  async remove( id: string, user: Partial<User> ) {
    try {
      
      let fCountry = await this._countryrepo.findOne({ where: { id }, select: { active: true } });

      if( !fCountry )
        throw new NotFoundException({ ok: false, message: `No se encontró país con id ${ id }` });
      
      
      let preCountry = await this._countryrepo.preload({
        id,
        active: !fCountry.active,
        userDelete: { id: user.id },
        deleteAt: new Date( currentDate() )
      });

      const newCountry = await this._countryrepo.save( preCountry );
      
      return {
        response: { ok: true },
        data: { ...newCountry },
      };

    } catch (error) {
      handleError( error, 'Ya existe un país con esta zona horaria o código de 3 letras' );
    }
  }
}
