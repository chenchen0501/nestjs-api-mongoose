import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  type: number;
}
