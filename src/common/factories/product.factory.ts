import { randFloat, randNumber, randProductName } from "@ngneat/falso";
import { define } from "typeorm-seeding";
import { Product } from '../../product/entities/product.entity';


define( Product, () => {
    const newProduct = new Product();
    
    newProduct.name = randProductName();
    newProduct.available = true;
    newProduct.price = randFloat({ min: 10, max: 500 });
    newProduct.urlImg = 'https://via.placeholder.com/400x400';

    newProduct.publicId = '';
    newProduct.signature = '';

    return newProduct;
} );