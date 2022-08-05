import { Module } from '@nestjs/common';
import { BugsController } from './bugs.controller';
import { BugsService } from './bugs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BugSchema, Bug } from './schemas/bug.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bug.name, schema: BugSchema }])],
  controllers: [BugsController],
  providers: [BugsService],
})
export class BugsModule {}
