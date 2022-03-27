import { adminInput } from './../super-admin/dto/admin.input';
import { Mutation } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './model/admin.model';
import { Model } from 'mongoose';
import * as argon from 'argon2';
import { ApolloError } from 'apollo-server-express';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
  ) { }


  async create(adminInput: adminInput): Promise<any> {
    try {

      const { fullName, email, password } = adminInput;

      // check if the email is already used
      const doc = await this.adminModel.findOne({ email });
      if (doc) throw new ApolloError('email already exist');

      // hash the user password
      const hash = await argon.hash(password);

      // create the user
      const createdAdmin = await this.adminModel.create({ fullName, email, hash });
      if (!createdAdmin)
        throw new ApolloError('failed to create user try again');
      return createdAdmin;
    } catch (error) {
      return error;
    }
  }
}
