import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminResolver } from './super-admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminSchema } from './model/super-admin.model';
import { AdminModule } from '../admin/admin.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuperAdmin.name, schema: SuperAdminSchema },
    ]),
    AdminModule
  ],
  providers: [SuperAdminService, SuperAdminResolver],
})
export class SuperAdminModule {}
