import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})

export class Address {
    @Prop({required:true})
    AddressLine1 :string

    @Prop()
    AddressLine2 :string

    @Prop({required:true})
    City:string

    @Prop({required:true})
    PinCode:number

    @Prop({required:true})
    Country:string
}

export type AddressDocument = Address & Document

export const AddressSchema = SchemaFactory.createForClass(Address)