import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtEstrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [
    ProductController
  ],
  providers: [
    ProductService,
  ],
  imports: [
    
    TypeOrmModule.forFeature( [Product] ),
    AuthModule

  ],
  exports: [
    TypeOrmModule
  ]
})
export class ProductModule {}
