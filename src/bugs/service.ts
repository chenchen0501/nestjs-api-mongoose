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

  public async findAll(QueryDto: QueryDto): Promise<any> {
    const { limit, page, ...rest } = QueryDto;

    const query = convertQuery(rest, ['name']);

    console.log('query', query);

    const data = await this.iModel
      .find(query)
      .skip(page == 1 ? null : (page - 1) * limit)
      .limit(limit)
      .populate('creator', 'name')
      .populate('project', 'name')
      .populate('currentOperator', 'name')
      .sort('-createTime')
      .exec();

    const total = await this.iModel.find(query).count();

    return {
      data,
      total,
    };
  }

  public async create(createDto: CreateDto): Promise<IResult> {
    return await this.iModel.create({
      ...createDto,
      currentOperator: createDto.creator,
    });
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
