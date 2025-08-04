import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Post()
  @ApiOperation({ summary: 'Create subcategory with images' })
  @ApiConsumes('multipart/form-data') 
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'banners', maxCount: 10 },
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
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      banners?: Express.Multer.File[];
    },
  ) {
    const image = files?.image?.[0];
    const banners = files?.banners || [];

    if (!image) {
      throw new BadRequestException('Sub Category image is required');
    }

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
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        files: 5,
      },
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update Subcategory',
    schema: {
      type: 'object',
      properties: {
        Name: { type: 'string', example: 'Mobile Phones' },
        Categories: {
          type: 'array',
          items: { type: 'string' },
          example: ['688de98d9bd7ef9b016eea22'],
        },
        image: { type: 'string', format: 'binary' },
        banners: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const image = files?.find((file) => file.fieldname === 'image') || null;
    const banners = files?.filter((file) => file.fieldname === 'banners') || [];

    return this.subcategoriesService.update(id, updateSubcategoryDto, image, banners);
  }


 @Patch('disable/:id')
async disable(@Param('id') id: string) {
  return this.subcategoriesService.disable(id);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }

  
}

