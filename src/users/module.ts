import { Module } from '@nestjs/common';
import { IController } from './controller';
import { IService } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [IController],
  providers: [IService],
})
export class UsersModule {}
