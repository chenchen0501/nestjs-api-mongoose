import { Document } from 'mongoose';

export interface ICustomer extends Document {
  readonly name: string;
  readonly type: number;
  readonly projectIds: Array<string>;
}
