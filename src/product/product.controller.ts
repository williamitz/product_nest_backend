import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PagerDto } from '../common/dto/pager.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtUser } from 'src/auth/decorator/jwt-user.decorator';
import { User } from 'src/user/entities/user.entity';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth()
  async create(@Body() createProductDto: CreateProductDto, @JwtUser() user: User) {

    return await this.productService.create(createProductDto, user.id );
  }

  @Get()
  @Auth()
  findAll( @Query() query: PagerDto, @JwtUser() user: User ) {
    return this.productService.findAll( query, user.id );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @JwtUser() user: User) {
    return await this.productService.update( id, updateProductDto, user.id );
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @JwtUser() user: User) {
    return this.productService.remove(id, user.id);
  }
}
