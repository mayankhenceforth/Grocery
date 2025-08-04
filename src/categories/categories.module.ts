import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categorie, CategorieSchema } from '../Schemas/Categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categorie.name, schema: CategorieSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService], // Optional but useful if used in other modules
})
export class CategoriesModule {}
