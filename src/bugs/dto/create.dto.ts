import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  @IsString()
  readonly creatorId: string;

  @IsNotEmpty()
  @IsString()
  readonly projectId: string;
}
