import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IResult } from './interfaces';
import { CreateDto, UpdateDto } from './dto';
import { User } from './schemas';
import { QueryDto } from './dto/query.dto';
import { convertQuery } from '../utils';

@Injectable()
export class IService {
  constructor(
    @InjectModel(User.name)
    private readonly iModel: Model<User>,
  ) {}

  public async findAll(QueryDto: QueryDto): Promise<User[]> {
    const { limit, page, ...rest } = QueryDto;

    const query = convertQuery(rest, ['name']);

    return await this.iModel.find(query).skip(page).limit(limit).exec();
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
    const User = await this.iModel.findByIdAndRemove(id);

    return User;
  }
}
