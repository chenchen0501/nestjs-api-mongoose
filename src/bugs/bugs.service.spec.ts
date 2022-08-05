import { Test, TestingModule } from '@nestjs/testing';
import { BugsService } from './bugs.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateBugDto } from './dto/create-bug.dto';
import { UpdateBugDto } from './dto/update-bug.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBug } from './interfaces/bug.interface';

const mockBug: any = {
  _id: 'anyid',
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

const mockBugUpdate: any = {
  _id: 'anyid',
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

const mockCustomer: any = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  email: 'test@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  Bugs: 'Bug #1',
};

const BugsArray = [
  {
    _id: 'anyid',
    name: 'name #1',
    address: 'address #1',
    description: 'description #1',
    customers: 'customer #1',
  },
  {
    _id: 'anyid',
    name: 'name #2',
    address: 'address #2',
    description: 'description #2',
    customers: 'customer #2',
  },
];

const createBugDto = {
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: 'customer #1',
};

const updateBugDto = {
  name: 'name update',
  address: 'address update',
  description: 'description update',
  customers: 'customer update',
  new: true,
};

describe('BugsService', () => {
  let service: BugsService;
  let model: Model<IBug>;

  const paginationQueryDto: PaginationQueryDto = {
    limit: 10,
    offset: 1,
  };

  const BugsArray = [
    {
      _id: 'anyid',
      name: 'name #1',
      address: 'address #1',
      description: 'description #1',
      customers: 'customer #1',
    },
    {
      _id: 'anyid',
      name: 'name #2',
      address: 'address #2',
      description: 'description #2',
      customers: 'customer #2',
    },
  ];

  const createBugDto = {
    name: 'name #1',
    address: 'address #1',
    description: 'description #1',
    customers: 'customer #1',
  };

  const updateBugDto = {
    name: 'name update',
    address: 'address update',
    description: 'description update',
    customers: 'customer update',
    new: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BugsService,
        {
          provide: getModelToken('Bug'),
          useValue: {
            find: jest.fn().mockReturnValue(BugsArray),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            new: jest.fn().mockResolvedValue(mockBug),
            constructor: jest.fn().mockResolvedValue(mockBug),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
            offset: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BugsService>(BugsService);
    model = module.get<Model<IBug>>(getModelToken('Bug'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all Bugs', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(BugsArray),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const Bugs = await service.findAll(paginationQueryDto);
      expect(Bugs).toEqual(BugsArray);
    });
  });

  describe('findOne()', () => {
    it('should return one Bug', async () => {
      const findSpy = jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockBug),
        populate: jest.fn().mockReturnThis(),
      } as any);
      const response = await service.findOne('anyid');
      expect(findSpy).toHaveBeenCalledWith({ _id: 'anyid' });
      expect(response).toEqual(mockBug);
    });

    it('should throw if find one Bug throws', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn(() => null),
        populate: jest.fn().mockReturnThis(),
      } as any);
      await expect(service.findOne('anyid')).rejects.toThrow(
        new NotFoundException('Bug #anyid not found'),
      );
    });
  });

  describe('create()', () => {
    it('should insert a new Bug', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          _id: 'a id',
          name: 'name #1',
          address: 'address #1',
          description: 'description #1',
          customers: 'customer #1',
        }),
      );
      const newBug = await service.create({
        name: 'name #1',
        address: 'address #1',
        description: 'description #1',
        customers: 'customer #1',
      });
      expect(newBug).toEqual({
        _id: 'a id',
        name: 'name #1',
        address: 'address #1',
        description: 'description #1',
        customers: 'customer #1',
      });
    });
  });

  describe('update()', () => {
    it('should call BugSchema update with correct values', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce({
        _id: 'anyid',
        updateBugDto,
        new: true,
      } as any);

      const updateBug = await service.update('anyid', updateBugDto);
      expect(updateBug).toEqual({
        _id: 'anyid',
        updateBugDto,
        new: true,
      });
    });

    it('should throw if BugSchema throws', async () => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockRejectedValueOnce(new NotFoundException('Bug #anyid not found'));
      await expect(service.update('anyid', updateBugDto)).rejects.toThrow(
        new NotFoundException('Bug #anyid not found'),
      );
    });
  });

  describe('remove()', () => {
    it('should call BugSchema remove with correct value', async () => {
      const removeSpy = jest.spyOn(model, 'findByIdAndRemove');
      const retVal = await service.remove('any id');
      expect(removeSpy).toBeCalledWith('any id');
      expect(retVal).toBeUndefined();
    });

    it('should throw if BugSchema remove throws', async () => {
      jest
        .spyOn(model, 'findByIdAndRemove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(service.remove('anyid')).rejects.toThrow(
        new NotFoundException(),
      );
    });
  });
});
