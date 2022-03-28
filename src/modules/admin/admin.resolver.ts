import { Admin } from './model/admin.model';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { Auth } from '../auth/model/auth.model';
import { signinInput } from '../auth/dto/signin.input';

@Resolver('Admin')
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(() => Admin)
  async getAll() {
    return 'getting all admins';
  }

  @Mutation(() => Auth, { name : 'adminLogin'})
  async signIn(@Args('signinInput') signinInput: signinInput): Promise<Auth> {
    return this.adminService.signIn(signinInput);
  }
  

}
