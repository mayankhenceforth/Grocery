import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class product {
    @Prop({ required: true })
    Name: string;

    @Prop({ required: true })
    Image: string[];

    @Prop({
        type: [Types.ObjectId],
        ref: 'Categorie',
        required: true,
    })
    Categories: Types.ObjectId[];

    @Prop({
        type: [Types.ObjectId],
        ref: 'SubCategorie',
        required: true,
    })
    SubCategories: Types.ObjectId[];

    @Prop({ required: true })
    Description: string

    @Prop({ required: true })
    OriginalPrice: number

    @Prop({ required: true })
    CurrentPrice: number

    @Prop({ required: true })
    Discount: number

    @Prop({ required: true })
    Unit: string

    @Prop({ required: true })
    Stock: number

    @Prop({ type: [Object], default: [] })
    MoreFields: any[];

    @Prop({ default: true })
    isActive: boolean
}
export type ProductDocument = product & Document

export const Product = SchemaFactory.createForClass(product)