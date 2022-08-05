import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBugDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly type: number;
}
