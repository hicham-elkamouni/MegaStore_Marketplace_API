import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Allowed } from '../auth/guards/Allowed.guard';
import { signUpInput } from './dto';
import { signInInput } from '../auth/dto/signin.input';
import { Auth } from '../auth/model/auth.model';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver('User')
export class userResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getAll() {
    return 'test';
  }

  @Mutation(() => Auth)
  async signIn(@Args('signInInput') signInInput: signInInput): Promise<Auth> {
    return this.userService.signIn(signInInput);
  }

  @Mutation(() => Auth)
  async signUp(@Args('signUpInput') signUpInput: signUpInput): Promise<Auth> {
    return this.userService.signUp(signUpInput);
  }

  @Allowed(['customer', 'seller'])
  @Mutation(() => Boolean)
  async logOut(@Context('req') req: any): Promise<boolean> {
    const userId = req.user?.userId;
    return this.userService.logOut(userId);
  }
}
