import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { PagerDto } from '../common/dto/pager.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {
  
  constructor(
    
    @InjectRepository( Product )
    private readonly _productRepo: Repository<Product>

  ) {}

  async create(body: CreateProductDto, userId: string) {
    
    try {

      body.id = randomUUID();
      const preProduct = this._productRepo.create({
        ...body,
        user: { id: userId }
      });

      return await this._productRepo.save( preProduct );

      // return preProduct;

    } catch (error) {
      console.log('error == ', error);
      throw new BadRequestException('Bad request to create product');
    }

  }

  async findAll( params: PagerDto, userId: string ) {
    try {
      let { limit = 0, offset = 0, filter = '' } = params;

      let where:  FindOptionsWhere<Product> = { user: { id: userId } };
      let pageOpt: FindManyOptions<Product> = {};

      console.log('where ==== ', where);

      if( filter != '' ) {
        where = { name: Like( filter ) };
      }

      if( limit > 0 ) {
        pageOpt = { take: limit, skip: offset };
      }

      pageOpt = { ...pageOpt, where };

      const [ data, total ] = await Promise.all([
        
        this._productRepo.find( pageOpt ),

        this._productRepo.count({ where })

      ]);

      return { data, total }
      
    } catch (error) {
      throw new BadRequestException('Bad request to find products');
    }
  }

  async findOne(id: string) {
    
    try {
    
      return await this._productRepo.findOne( { where: { id } } );
      
    } catch (error) {
      throw new BadRequestException('Bad request to find by id product');
    }
    
  }

  async update(id: string, body: UpdateProductDto, userId: string) {
    try {

      const preProduct = await this._productRepo.preload({ id, ...body, user: { id: userId } });

      if( !preProduct ) throw new NotFoundException(`Not found product by ${ id }`);

      return await this._productRepo.save( preProduct );
      
    } catch (error) {
      console.log('error == ', error);
      throw new BadRequestException('Bad request to update product');
    }
  }

  async remove( id: string, userId: string ) {
    try {

      return await this._productRepo.delete({id, user: { id: userId }});
      
    } catch (error) {
      throw new BadRequestException('Bad request to delete product');
    }
  }
}
