import { Document } from 'mongoose';

export interface IBug extends Document {
  readonly name: string;

  readonly type: number;

  readonly creator: string;
}
