import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { product, ProductDocument } from 'src/Schemas/Product.schema';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

 constructor(
    @InjectModel(product.name) private readonly productModel: Model<ProductDocument>,
  ) { }
 
  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ): Promise<Product> {
    if (!images || images.length === 0) {
      throw new BadRequestException('At least one image must be uploaded');
    }
    const imagePaths = images.map((file) => file.path || file.originalname);

    const newProduct = new this.productModel({
      ...createProductDto,
      Image: imagePaths,
    });

    return newProduct.save();
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
