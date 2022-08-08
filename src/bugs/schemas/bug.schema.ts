import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Bug extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  type: number;

  @Prop({ type: [Types.ObjectId], ref: 'Customer' })
  creator: string;
}

export const BugSchema = SchemaFactory.createForClass(Bug);
