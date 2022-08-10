import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { IService } from './service';
import { CreateDto, UpdateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryDto } from './dto/query.dto';

@ApiTags('users')
@Controller('users')
export class IController {
  constructor(private readonly iService: IService) {}

  @Get()
  public async getAll(@Res() res, @Query() QueryDto: QueryDto) {
    const result = await this.iService.findAll(QueryDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post()
  public async add(@Res() res, @Body() CreateDto: CreateDto) {
    try {
      const result = await this.iService.create(CreateDto);
      return res.status(HttpStatus.OK).json({
        message: '新增成功',
        result,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: '新增失败',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async update(
    @Res() res,
    @Param('id') id: string,
    @Body() UpdateDto: UpdateDto,
  ) {
    try {
      const result = await this.iService.update(id, UpdateDto);
      return res.status(HttpStatus.OK).json({
        message: '更新成功',
        result,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: '更新失败',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async del(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.iService.del(id);
      if (result) {
        return res.status(HttpStatus.OK).json({
          message: '删除成功',
          result,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: '当前id不存在',
          status: 400,
        });
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: '删除失败',
        status: 400,
      });
    }
  }
}
