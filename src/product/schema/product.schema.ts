// product.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

class Variant {
  @Prop()
  itemId: string;

  @Prop()
  description: string;

  @Prop()
  packaging: string;

  @Prop()
  unitPrice: number;

  @Prop()
  quantityOnHand: number;
}

@Schema()
export class Product {
  @Prop({ unique: true })
  productId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  packaging: string;

  @Prop()
  variants: Variant[];

  @Prop()
  vendorId: string;

  // Add other properties as needed
}

export const ProductSchema = SchemaFactory.createForClass(Product);
