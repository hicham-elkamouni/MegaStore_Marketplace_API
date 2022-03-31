import { SellerAccountStatusInput } from './../user/dto/sellerAccountStatus.input';
import { SuperAdmin } from './model/super-admin.model';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SuperAdminService } from './super-admin.service';
import { Auth } from '../auth/model/auth.model';
import { signInInput } from '../auth/dto/signin.input';
import { Allowed } from '../auth/guards/Allowed.guard';
import { Admin } from '../admin/model/admin.model';
import { CreateAdminInput, UpdateAdminInput } from '../admin/dto';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';
import { User } from '../user/model/user.model';
import { SellerRequestInput } from '../user/dto';

@Resolver('SuperAdmin')
export class SuperAdminResolver {
  constructor(
    private superAdminService: SuperAdminService,
    private adminService: AdminService,
    private userService: UserService
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

  @Allowed(['superAdmin'])
  @Mutation(() => Admin, { name: 'CreateAdmin' })
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ): Promise<Admin> {
    return this.adminService.create(createAdminInput);
  }

  @Allowed(['superAdmin'])
  @Mutation(() => Admin, { name: 'UpdateAdmin' })
  async updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput): Promise<Admin> {
    return this.adminService.update(updateAdminInput);
  }

  @Allowed(['superAdmin'])
  @Query(() => [Admin], { name: 'getAllAdmins' })
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.getAll();
  }

  @Allowed(['superAdmin'])
  @Query(() => Admin, { name: 'getAdminById' })
  async getAdminById(@Args('id') id: string): Promise<Admin> {
    return this.adminService.getById(id);
  }

  @Allowed(['superAdmin'])
  @Mutation(() => Admin, { name: 'DeleteAdmin' })
  async deleteAdmin(@Args('id') id: string): Promise<Admin> {
    return this.adminService.delete(id);
  }

  @Mutation(() => User, { name: 'handleSellerRequest' })
  async handleSellerRequest(@Args('sellerRequestInput') data: SellerRequestInput): Promise<User> {
    return this.userService.handleSellerRequest(data)
  }

  @Mutation(() => User, { name: 'SellerAccountStatus' })
  async sellerAccountStatus(@Args('SellerAccountStatusInput') data: SellerAccountStatusInput): Promise<User> {
    return this.userService.sellerAccountStatus(data)
  }
}
