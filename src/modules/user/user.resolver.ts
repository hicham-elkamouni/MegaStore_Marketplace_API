import { Req, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { Roles } from '../auth/decorators/role.decorator';
import { Allowed } from '../auth/guards/Allowed.guard';
import { JwtGuard } from '../auth/guards/JwtGuard.guard';
import { RolesGuard } from '../auth/guards/RolesGuard.guard';
import { signinInput } from './dto';
import { Auth } from './model/auth.model';
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
  async signIn(@Args('signinInput') signinInput: signinInput): Promise<Auth> {
    return this.userService.signIn(signinInput);
  }

  @Allowed(['admin', 'asd'])
  @Mutation(() => Auth)
  async logOut(@Context('req') req: any): Promise<User> {
    const userId = req.user?.userId;
    return this.userService.logOut(userId);
  }
}
