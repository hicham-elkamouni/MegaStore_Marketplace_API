import { SuperAdmin } from './model/super-admin.model';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SuperAdminService } from './super-admin.service';
import { Auth } from '../auth/model/auth.model';
import { signinInput } from '../auth/dto/signin.input';
@Resolver('SuperAdmin')
export class SuperAdminResolver {
  constructor(private superAdminService: SuperAdminService) {}

  @Query(() => SuperAdmin)
  async getAll() {
    return 'test';
  }

  @Mutation(() => Auth)
  async superAdminLogin(
    @Args('signinInput') signinInput: signinInput,
  ): Promise<Auth> {
    return this.superAdminService.signIn(signinInput);
  }
}
