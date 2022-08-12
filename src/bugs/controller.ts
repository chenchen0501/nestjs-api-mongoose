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
import { ResData } from 'src/common/interface/resData.dto';

@ApiTags('bugs')
@Controller('bugs')
export class IController {
  constructor(private readonly iService: IService) {}

  @Get()
  public async getAll(@Res() res, @Query() QueryDto: QueryDto) {
    const data = await this.iService.findAll(QueryDto);
    return res.status(HttpStatus.OK).json({
      message: 'ok',
      data,
      status: 200,
    });
  }

  @Post()
  public async add(@Res() res, @Body() CreateDto: CreateDto) {
    try {
      await this.iService.create(CreateDto);
      return res.status(HttpStatus.OK).json({
        message: '新增成功',
        status: 200,
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
      await this.iService.update(id, UpdateDto);
      return res.status(HttpStatus.OK).json({
        message: '更新成功',
        status: 200,
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
          status: 200,
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
