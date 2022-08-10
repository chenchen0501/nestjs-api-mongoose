import { Document } from 'mongoose';

export interface IResult extends Document {
  readonly name: string;
  readonly type: number;
  readonly creatorId: string;
  readonly projectId: string;
}
