
import { SuperAdmin } from './model/super-admin.model';
import { Resolver, Query } from '@nestjs/graphql';
import { SuperAdminService } from './super-admin.service';


@Resolver('SuperAdmin')
export class SuperAdminResolver {
  constructor(private superAdminService: SuperAdminService) { }

  @Query(() => SuperAdmin)
  async getAll() {
    return 'test';
  }
}
