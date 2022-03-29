import { SuperAdmin } from './model/super-admin.model';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SuperAdminService } from './super-admin.service';
import { Auth } from '../auth/model/auth.model';
import { signInInput } from '../auth/dto/signin.input';
import { Allowed } from '../auth/guards/Allowed.guard';
import { Admin } from '../admin/model/admin.model';
import { CreateAdminInput, UpdateAdminInput } from '../admin/dto';
import { AdminService } from '../admin/admin.service';

@Resolver('SuperAdmin')
export class SuperAdminResolver {
  constructor(
    private superAdminService: SuperAdminService,
    private adminService: AdminService,
  ) { }


  @Mutation(() => Auth, { name: 'superAdminLogin' })
  async signIn(@Args('signInInput') signInInput: signInInput): Promise<Auth> {
    return this.superAdminService.signIn(signInInput);
  }

  @Allowed(['superAdmin'])
  @Mutation(() => SuperAdmin, { name: 'superAdminLogout' })
  async logOut(@Context('req') req: any): Promise<SuperAdmin> {
    const userId = req.user?.userId;
    return this.superAdminService.logOut(userId);
  }

  @Mutation(() => Admin, { name: 'CreateAdmin' })
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ): Promise<Admin> {
    return this.adminService.create(createAdminInput);
  }

  @Mutation(() => Admin, { name: 'UpdateAdmin' })
  async updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput): Promise<Admin> {
    return this.adminService.update(updateAdminInput);
  }

  @Query(() => [Admin], { name: 'getAllAdmins' })
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.getAll();
  }
}
