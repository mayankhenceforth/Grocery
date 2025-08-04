import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Post()
  @ApiOperation({ summary: 'Create subcategory with images' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'Image', maxCount: 1 },
      { name: 'Banners', maxCount: 10 },
    ]),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        Name: { type: 'string', example: 'Mobile Phones' },
        Categories: {
          type: 'array',
          items: { type: 'string', example: '64c456cbe4b0c7f123456789' },
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        banners: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: ['Name', 'Categories', 'image'],
    },
  })
  async create(
    @Body() createSubcategoryDto: CreateSubcategoryDto,
    @UploadedFile() image: Express.Multer.File,
    @UploadedFiles() banners: Express.Multer.File[],
  ) {
    if (!image) {
      throw new BadRequestException('Sub Category image is required');
    }
    console.log(createSubcategoryDto)
    return this.subcategoriesService.create(createSubcategoryDto, image, banners);
  }

  @Get()
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
