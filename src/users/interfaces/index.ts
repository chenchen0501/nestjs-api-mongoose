import { Document } from 'mongoose';

export interface IResult extends Document {
  readonly name: string;

  readonly type: number;
}
