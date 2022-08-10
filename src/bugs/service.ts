import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IResult } from './interfaces';
import { CreateDto, UpdateDto } from './dto';
import { Bug } from './schemas';
import { QueryDto } from './dto/query.dto';
import { convertQuery } from '../utils';

@Injectable()
export class IService {
  constructor(
    @InjectModel(Bug.name)
    private readonly iModel: Model<Bug>,
  ) {}

  public async findAll(QueryDto: QueryDto): Promise<Bug[]> {
    const { limit, offset, ...rest } = QueryDto;

    const query = convertQuery(rest, ['name']);

    return await this.iModel
      .find(query)
      .skip(offset)
      .limit(limit)
      .populate('creatorId')
      .populate('projectId')
      .exec();
  }

  public async create(createDto: CreateDto): Promise<IResult> {
    const result = await this.iModel.create(createDto);
    return result;
  }

  public async update(id: string, UpdateDto: UpdateDto): Promise<IResult> {
    const result = await this.iModel.findByIdAndUpdate({ _id: id }, UpdateDto, {
      new: true,
    });

    return result;
  }

  public async del(id: string): Promise<IResult> {
    const result = await this.iModel.findByIdAndRemove(id);

    return result;
  }
}
