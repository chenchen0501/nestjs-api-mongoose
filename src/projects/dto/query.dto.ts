import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name: string;
}
