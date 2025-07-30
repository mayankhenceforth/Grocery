import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SubCategorie extends Document {
  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Image: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Categorie',
    required: true,
  })
  Categories: Types.ObjectId[]; 

  @Prop({ default: [] })
  BannerImage: string[];
}

export type SubCategorieDocument = SubCategorie & Document;

export const SubCategorieSchema = SchemaFactory.createForClass(SubCategorie);
