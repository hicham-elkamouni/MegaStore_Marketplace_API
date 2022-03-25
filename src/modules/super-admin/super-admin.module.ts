import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminResolver } from './super-admin.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminSchema } from './model/super-admin.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuperAdmin.name, schema: SuperAdminSchema }]),
  ],
  providers: [SuperAdminService, SuperAdminResolver]
})
export class SuperAdminModule { }
