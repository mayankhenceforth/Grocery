import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorie, SubCategorieSchema } from 'src/Schemas/SubCategories.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: SubCategorie.name, schema:SubCategorieSchema }])],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
