import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Bug extends Document {
  @Prop({ unique: true })
  name: string;

  @Prop()
  expect: string;

  @Prop()
  type: number;

  @Prop({ default: 1 })
  status: number;

  @Prop()
  priority: number;

  @Prop()
  files: Array<string>;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: string;

  @Prop({ default: Date.now() })
  createTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  currentOperator: string;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: string;
}

export const BugSchema = SchemaFactory.createForClass(Bug);
