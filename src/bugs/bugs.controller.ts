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

@ApiTags('bugs')
@Controller('bugs')
export class BugsController {
  constructor(private readonly bugsService: BugsService) {}

  @Get()
  public async getAllBugs(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const bugs = await this.bugsService.findAll(paginationQuery);
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
}
