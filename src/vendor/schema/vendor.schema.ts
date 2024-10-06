import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vendor extends Document {
  @Prop()
  docId: string;

  @Prop({ unique: true })
  name: string;
}
export const VendorSchema = SchemaFactory.createForClass(Vendor);
