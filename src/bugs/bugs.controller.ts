import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { BugsService } from './bugs.service';
import { CreateBugDto, UpdateBugDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryBug } from './dto/query-bug.dto';

@ApiTags('bugs')
@Controller('bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  public async getAllBugs(@Res() res, @Query() queryBug: QueryBug) {
    const bugs = await this.bugsService.findAll(queryBug);
    return res.status(HttpStatus.OK).json(bugs);
  }

  @Post()
  public async addBug(@Res() res, @Body() createBugDto: CreateBugDto) {
    try {
      const bug = await this.bugsService.create(createBugDto);
      return res.status(HttpStatus.OK).json({
        message: 'bug has been created successfully',
        bug,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: bug not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updateBug(
    @Res() res,
    @Param('id') bugId: string,
    @Body() updateBugDto: UpdateBugDto,
  ) {
    try {
      const bug = await this.bugsService.updateBug(bugId, updateBugDto);
      return res.status(HttpStatus.OK).json({
        message: 'bug has been updated',
        bug,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: bug not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async delBug(@Res() res, @Param('id') bugId: string) {
    try {
      const bug = await this.bugsService.delBug(bugId);
      return res.status(HttpStatus.OK).json({
        message: 'bug has been deleted',
        bug,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: bug not deleted!',
        status: 400,
      });
    }
  }
}
