import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('Image'))
  @ApiOperation({ summary: 'Create a new category with an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Category with image',
    schema: {
      type: 'object',
      properties: {
        Name: { type: 'string', example: 'Electronics' },
        Image: { type: 'string', format: 'binary' },
      },
      required: ['Name', 'Image'],
    },
  })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Category image is required');
    }

    return this.categoriesService.create(createCategoryDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'List of categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category details' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('Image'))
  @ApiOperation({ summary: 'Update category details and/or image' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiBody({
    description: 'Update Category (image optional)',
    schema: {
      type: 'object',
      properties: {
        Name: { type: 'string', example: 'Updated Category Name' },
        Image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, file);
  }

  @Patch('disable/:id')
  @ApiOperation({ summary: 'Disable (soft-delete) a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category disabled successfully' })
  async disable(@Param('id') id: string) {
    return this.categoriesService.disable(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category permanently' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
