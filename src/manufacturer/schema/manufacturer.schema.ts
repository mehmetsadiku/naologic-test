import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Manufacturer extends Document {
  @Prop()
  docId: string;

  @Prop({ unique: true })
  name: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
