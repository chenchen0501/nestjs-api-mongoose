import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ unique: true })
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
