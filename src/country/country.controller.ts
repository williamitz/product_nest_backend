import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtUser } from 'src/auth/decorator/jwt-user.decorator';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { User } from '../user/entities/user.entity';
import { PagerDto } from '../common/dto/pager.dto';

@Auth()
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create( @Body() body: CreateCountryDto, @JwtUser() user: Partial<User> ) {
    return this.countryService.create( body, user );
  }

  @Get()
  findAll( @Query() query: PagerDto ) {
    return this.countryService.findAll( query );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCountryDto, @JwtUser() user: Partial<User>) {
    return this.countryService.update( id, body, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @JwtUser() user: Partial<User>) {
    return this.countryService.remove( id, user );
  }
}
