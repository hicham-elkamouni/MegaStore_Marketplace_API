import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './model/admin.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [AdminService, AdminResolver],
  exports: [AdminService]
})
export class AdminModule {}

