import { Module } from '@nestjs/common';
import { IController } from './controller';
import { IService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { BugSchema, Bug } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bug.name, schema: BugSchema }])],
  controllers: [IController],
  providers: [IService],
})
export class BugsModule {}
