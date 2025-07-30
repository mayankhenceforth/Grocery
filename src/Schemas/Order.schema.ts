import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],
    required: true,
  })
  products: Types.ObjectId[];

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ default: () => new Date() })
  shoppingDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
