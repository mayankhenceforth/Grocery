import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SubCategorie, SubCategorieDocument } from 'src/Schemas/SubCategories.schema';
import { Model, Types } from 'mongoose';
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
    const existing = await this.subCategorieModel.findOne({ Name: createSubcategoryDto.Name });
    if (existing) {
      throw new NotAcceptableException('This subcategory already exists.');
    }

    const uploadedImage = await uploadToCloudinary(image, 'subcategories');

    const bannerImageUrls = await Promise.all(
      banners.map((file) => uploadToCloudinary(file, 'subcategories/banners'))
    );


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

  async findOne(id: string) {
    return this.subCategorieModel.findById(id);
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
    image?: Express.Multer.File | null,
    banners?: Express.Multer.File[],
  ) {
    const subcategory = await this.subCategorieModel.findById(id);
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    // Upload new image if provided
    if (image) {
      const uploadedImage = await uploadToCloudinary(image, 'subcategories');
      subcategory.Image = uploadedImage.secure_url;
    }

    // Upload banners if provided
    if (banners && banners.length > 0) {
      const uploadedBanners = await Promise.all(
        banners.map((file) => uploadToCloudinary(file, 'subcategories/banners')),
      );
      subcategory.BannerImage = uploadedBanners.map((b) => b.secure_url);
    }

    // Optional: update Name
    if (updateSubcategoryDto.Name) {
      subcategory.Name = updateSubcategoryDto.Name;
    }

    // Optional: update Categories
    if (
      updateSubcategoryDto.Categories &&
      Array.isArray(updateSubcategoryDto.Categories)
    ) {
      subcategory.Categories = updateSubcategoryDto.Categories.map(
        (id) => new Types.ObjectId(id),
      );
    }

    await subcategory.save();

    return {
      message: 'Subcategory updated successfully',
      data: subcategory,
    };
  }

  remove(id: string) {
    return this.subCategorieModel.findByIdAndDelete(id);
  }

  async disable(id: string) {
    return this.subCategorieModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

}
