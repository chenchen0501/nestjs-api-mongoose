import { Module } from '@nestjs/common';
import { IController } from './controller';
import { IService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema, Project } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [IController],
  providers: [IService],
})
export class ProjectsModule {}
