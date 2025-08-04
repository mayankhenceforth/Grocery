import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { product, ProductDocument } from 'src/Schemas/Product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {

 constructor(
    @InjectModel(product.name) private readonly productModel: Model<ProductDocument>,
  ) { }
  create(createProductDto: CreateProductDto) {
    return this.productModel.find();
  }

  findAll() {
    return ;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
