import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
}
