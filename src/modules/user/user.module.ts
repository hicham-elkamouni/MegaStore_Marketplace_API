import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userResolver } from './user.resolver';
import { User, UserSchema } from './model/user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [userResolver, UserService],
})
export class UserModule {}
