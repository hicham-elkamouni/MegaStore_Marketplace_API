import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminDocument } from './model/super-admin.model';
import { Model } from 'mongoose';
@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superAdminModel: Model<SuperAdminDocument>,
  ) { }
}
