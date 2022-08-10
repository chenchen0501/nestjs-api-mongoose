import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  name: string;

  @Prop()
  type: number;

  @Prop({ type: [Types.ObjectId], ref: 'project' })
  projectIds: Array<string>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
