import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IResult } from './interfaces';
import { CreateDto, UpdateDto } from './dto';
import { Project } from './schemas';
import { QueryDto } from './dto/query.dto';
import { convertQuery } from '../utils';

@Injectable()
export class IService {
  constructor(
    @InjectModel(Project.name)
    private readonly iModel: Model<Project>,
  ) {}

  public async findAll(QueryDto: QueryDto): Promise<Project[]> {
    const { limit, offset, ...rest } = QueryDto;

    const query = convertQuery(rest, ['name']);

    return await this.iModel.find(query).skip(offset).limit(limit).exec();
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
