import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryBug extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  type: number;
}
