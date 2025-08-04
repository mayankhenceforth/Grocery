import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categorie, categorieDocument } from 'src/Schemas/Categories.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { uploadToCloudinary } from 'src/comman/utils/upload.utils';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Categorie.name)
    private readonly categorieModel: Model<categorieDocument>,

  ) { }

  async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    const existing = await this.categorieModel.findOne({ Name: createCategoryDto.Name });
    if (existing) {
      throw new NotAcceptableException('This category already exists');
    }

    if (!file) {
      throw new NotAcceptableException('Category image is required');
    }

    const uploadResult = await uploadToCloudinary(file, 'categories');

    const newCategory = await this.categorieModel.create({
      Name: createCategoryDto.Name,
      Image: uploadResult.secure_url,
    });

    return {
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  async findAll() {
  return this.categorieModel.find()
}


  async findOne(id: string) {
    return await this.categorieModel.findById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.categorieModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }


    if (updateCategoryDto.Name && updateCategoryDto.Name == category.Name) {
      const existing = await this.categorieModel.findOne({
        Name: updateCategoryDto.Name,
        _id: { $ne: id }
      });
      if (existing) {
        throw new NotAcceptableException('A category with this name already exists');
      }
    }

    const updateData: any = {
      ...updateCategoryDto
    };

    if (file) {
      const uploadResult = await uploadToCloudinary(file, 'categories');
      updateData.Image = uploadResult.secure_url;
    }

    const updatedCategory = await this.categorieModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return {
      message: 'Category updated successfully',
      data: updatedCategory,
    };
  }

  async disable(id: string) {
    return this.categorieModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }


  remove(id: string) {
    return this.categorieModel.findByIdAndDelete(id);
  }
}
