import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"


@Schema({timestamps:true})

export class Categorie  {
    @Prop({ required: true })
    Name: string

    @Prop({ required: true })
    Image: string

    
}


export type categorieDocument = Categorie & Document

export const CategorieSchema = SchemaFactory.createForClass(Categorie) 