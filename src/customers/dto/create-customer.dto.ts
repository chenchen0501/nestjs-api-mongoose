import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly type: number;

  @IsArray()
  @IsOptional()
  readonly projectIds: Array<string>;
}
