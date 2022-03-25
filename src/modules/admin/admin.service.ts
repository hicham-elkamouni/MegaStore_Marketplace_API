import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./model/admin.model";
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
    constructor (
        @InjectModel(Admin.name)
        private adminModel : Model<AdminDocument>
    ) { }

}