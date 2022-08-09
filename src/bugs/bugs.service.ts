import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IBug } from './interfaces/bug.interface';
import { CreateBugDto, UpdateBugDto } from './dto';
import { Bug } from './schemas/bug.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { QueryBug } from './dto/query-bug.dto';

@Injectable()
export class BugsService {
  constructor(
    @InjectModel(Bug.name)
    private readonly bugModel: Model<Bug>,
  ) {}

  public async findAll(queryBug: QueryBug): Promise<Bug[]> {
    const { limit, offset, ...rest } = queryBug;

    const blurryKeys = ['name'];
    const query = {};

    for (let key in rest) {
      if (queryBug[key]) {
        query[key] = blurryKeys.includes(key)
          ? new RegExp(queryBug[key])
          : queryBug[key];
      }
    }

    return await this.bugModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate('creator')
      .exec();
  }

  public async create(createBugDto: CreateBugDto): Promise<IBug> {
    const organization = await this.bugModel.create(createBugDto);
    return organization;
  }

  public async updateBug(
    bugId: string,
    updateBugDto: UpdateBugDto,
  ): Promise<IBug> {
    const bug = await this.bugModel.findByIdAndUpdate(
      { _id: bugId },
      updateBugDto,
      { new: true },
    );

    return bug;
  }
}
