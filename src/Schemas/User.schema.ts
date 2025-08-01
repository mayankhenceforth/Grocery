import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class User  {
    @Prop({ required: true })
    Name: string

    @Prop({ required: true })
    Email: string

    @Prop({ required: true })
    PhoneNumber: number

    @Prop({
        required: true,
        select:false
    })
    Password: string

    @Prop({default:''})
    ProfilePicture: string

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Order' }],
        default: [],
    })
    Order: Types.ObjectId[];

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Address' }],
        default: [],
    })
    Address: Types.ObjectId[];

    @Prop({
        type: [String],
        default: []
    })
    CartProduct: string[]

    @Prop({
        enum: ['user', 'admin', 'subadmin', 'shopkeeper'],
        default: 'user',
    })
    role: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);