import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { signinInput } from './dto';
import { Auth } from './model/auth.model';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver('User')
export class userResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getAll() {
    return 'tnakt';
  }

  @Mutation(() => Auth)
  async signIn(@Args('signinInput') signinInput: signinInput): Promise<Auth> {
    return this.userService.signIn(signinInput);
  }
}
