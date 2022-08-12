import { PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto extends PartialType(CreateDto) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '状态',
  })
  readonly status: number;
}
