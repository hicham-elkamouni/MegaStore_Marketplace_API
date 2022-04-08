import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userResolver } from './user.resolver';
import { User, UserSchema } from './model/user.model';
import { UserService } from './user.service';
import {StoreModule} from '../store/store.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StoreModule
  ],
  providers: [userResolver, UserService],
  exports: [UserService]
})
export class UserModule { }
