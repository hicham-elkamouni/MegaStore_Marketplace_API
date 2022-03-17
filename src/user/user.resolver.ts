import { Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { Schema as MongooseSchema } from 'mongoose';
import { of } from 'rxjs';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(): Promise<User> {
    return this.userService.getById();
  }
}
