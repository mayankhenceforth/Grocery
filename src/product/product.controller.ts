import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

@Post()
  @ApiOperation({ summary: 'Create a new product' })
  @UseInterceptors(FilesInterceptor('Image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product creation request',
    schema: {
      type: 'object',
      properties: {
        Name: { type: 'string', example: 'Mango' },
        Image: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        Categories: {
          type: 'array',
          items: { type: 'string' },
          example: ['64d21a63fa0b9f124e5abf0d'],
        },
        SubCategories: {
          type: 'array',
          items: { type: 'string' },
          example: ['64d21a78fa0b9f124e5abf0e'],
        },
        Description: { type: 'string', example: 'Fresh mangoes from farm' },
        OriginalPrice: { type: 'number', example: 100 },
        CurrentPrice: { type: 'number', example: 80 },
        Unit: { type: 'string', example: '1kg' },
        Stock: { type: 'number', example: 50 },
        MoreFields: {
          type: 'array',
          items: { type: 'object' },
          example: [{ key: 'color', value: 'yellow' }],
        },
      },
    },
  })
  async create(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.create(body, files);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
