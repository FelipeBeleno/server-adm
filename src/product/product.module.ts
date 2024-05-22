import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])

  ],
  controllers: [ProductController],
  providers: [ProductService, FirestoreService],
})
export class ProductModule { }
