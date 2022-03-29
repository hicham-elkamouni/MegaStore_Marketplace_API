import { SuperAdmin } from './model/super-admin.model';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SuperAdminService } from './super-admin.service';
import { Auth } from '../auth/model/auth.model';
import { signInInput } from '../auth/dto/signin.input';
import { Allowed } from '../auth/guards/Allowed.guard';
import { Admin } from '../admin/model/admin.model';
import { adminInput } from './dto';
import { AdminService } from '../admin/admin.service';
@Resolver('SuperAdmin')
export class SuperAdminResolver {
  constructor(
    private superAdminService: SuperAdminService,
    private adminService: AdminService,
  ) {}

  @Query(() => SuperAdmin)
  async getAll() {
    return 'test';
  }

  @Mutation(() => Auth, { name: 'superAdminLogin' })
  async signIn(@Args('signinInput') signinInput: signInInput): Promise<Auth> {
    return this.superAdminService.signIn(signinInput);
  }

  @Allowed(['superAdmin'])
  @Mutation(() => SuperAdmin, { name: 'superAdminLogout' })
  async logOut(@Context('req') req: any): Promise<SuperAdmin> {
    const userId = req.user?.userId;
    return this.superAdminService.logOut(userId);
  }

  @Mutation(() => Admin, { name: 'CreateAdmin' })
  async createAdmin(
    @Args('adminInput') adminInput: adminInput,
  ): Promise<Admin> {
    return this.adminService.create(adminInput);
  }
}
