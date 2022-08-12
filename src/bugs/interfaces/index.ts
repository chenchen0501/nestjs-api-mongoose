import { Document } from 'mongoose';

export interface IResult extends Document {
  readonly name: string;
  readonly expect: string;
  readonly type: number;
  readonly status: number;
  readonly priority: number;
  readonly creator: string;
  readonly createTime: Date;
  readonly currentOperator: string;
  readonly files: Array<string>;
  readonly project: string;
}
