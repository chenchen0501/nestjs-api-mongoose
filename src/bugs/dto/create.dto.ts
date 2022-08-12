import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    description: '名称',
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '期望',
  })
  readonly expect: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '类型',
  })
  readonly type: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '优先级',
  })
  readonly priority: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '创建人',
  })
  readonly creator: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: '图片',
  })
  readonly files: Array<string>;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '所属项目',
  })
  readonly project: string;
}
