import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategorie, SubCategorieDocument } from 'src/Schemas/SubCategories.schema';
import { Model } from 'mongoose';
import { uploadToCloudinary } from 'src/comman/utils/upload.utils';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(SubCategorie.name) private readonly subCategorieModel: Model<SubCategorieDocument>,
  ) { }


  async create(
    createSubcategoryDto: CreateSubcategoryDto,
    image: Express.Multer.File,
    banners: Express.Multer.File[],
  ) {
    // check duplicate by name
    const existing = await this.subCategorieModel.findOne({ Name: createSubcategoryDto.Name });
    if (existing) {
      throw new NotAcceptableException('This subcategory already exists.');
    }

    // Upload main image to Cloudinary
    const uploadedImage = await uploadToCloudinary(image, 'subcategories');

    // Upload banner images to Cloudinary
    const bannerImageUrls = await Promise.all(
      banners.map((file) => uploadToCloudinary(file, 'subcategories/banners'))
    );

    // Create new subcategory
    const newSubcategory = await this.subCategorieModel.create({
      Name: createSubcategoryDto.Name,
      Image: uploadedImage.secure_url,
      Categories: createSubcategoryDto.Categories,
      BannerImage: bannerImageUrls.map((b) => b.secure_url),
    });

    return {
      message: 'Subcategory created successfully',
      data: newSubcategory,
    };
  }

  async findAll() {
    return this.subCategorieModel.find();
  }

  findOne(id: string) {
    return this.subCategorieModel.findById(id);
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  remove(id: string) {
    return this.subCategorieModel.findByIdAndDelete(id);
  }
}
