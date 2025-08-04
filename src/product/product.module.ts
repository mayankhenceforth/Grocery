import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, product } from 'src/Schemas/Product.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: product.name, schema:Product }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
