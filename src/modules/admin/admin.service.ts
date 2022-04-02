import { CreateAdminInput, UpdateAdminInput } from './dto';
import { Mutation } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './model/admin.model';
import { signInInput } from '../auth/dto/signin.input';
import { Model } from 'mongoose';
import { Auth } from '../auth/model/auth.model';
import { ApolloError } from 'apollo-server-express';
import { AuthService } from '../auth/auth.service';
import * as argon from 'argon2';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private authService: AuthService,
  ) { }

  /**
   * function for admin login
   * @params {(signinInput)} takes the admin credentials
   * @returns {(Promise<Auth>)} returns a an access token and the userId and store a refresh token in DB
   * @memberof UsersService
   */

  async signIn(signinInput: signInInput): Promise<Auth> {
    try {
      const { email, password } = signinInput;

      // check the email provided
      const admin = await this.adminModel.findOne({ email: email });
      if (!admin) throw new ApolloError('Email not found');

      //check the user
      const passwordMatches = await argon.verify(
        admin.hashedPassword,
        password,
      );
      if (!passwordMatches) throw new ApolloError('password not correct');

      // create an access and a refresh token
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(admin._id, admin.roles, '15m', 'access'),
        this.authService.createToken(admin._id, admin.roles, '7d', 'refresh'),
      ]);

      // register the refresh token in the DB
      await this.updateRtHash(admin._id, refresh_token);

      return { userId: admin._id, token: access_token };
    } catch (error) {
      return error;
    }
  }

  async updateRtHash(admin_id: number, rt: string): Promise<Admin> {
    //hash the refreshToken
    const hashRerf = await argon.hash(rt);
    //register the refresh token in DB
    const updated = await this.adminModel.findOneAndUpdate(
      { _id: admin_id },
      { hashRerf },
      { new: true },
    );
    return updated;
  }

  async create(createAdminInput: CreateAdminInput): Promise<Admin> {
    try {
      const { fullName, email, password } = createAdminInput;

      // check if the email is already used
      const doc = await this.adminModel.findOne({ email });
      if (doc) throw new ApolloError('email already exist');

      // hash the user password
      const hashedPassword = await argon.hash(password);

      // create the user
      const createdAdmin = await this.adminModel.create({
        fullName,
        email,
        hashedPassword,
      });
      if (!createdAdmin)
        throw new ApolloError('failed to create user try again');
      return createdAdmin;
    } catch (error) {
      return error;
    }
  }

  async update(updateAdminInput: UpdateAdminInput): Promise<Admin> {
    try {
      const { id, fullName, email, password } = updateAdminInput;

      // find the admin
      const doc = await this.adminModel.findOne({ _id: id });
      if (!doc) throw new ApolloError('user not found');

      // hash the password
      if (password) {
        const hashedPassword = await argon.hash(password);
        doc.hashedPassword = hashedPassword;
      }

      // update the document
      fullName ? doc.fullName = fullName : null;
      email ? doc.email = email : null;

      // save the document
      const updatedAdmin = await doc.save();

      // Check if the document has not been updated
      if (!updatedAdmin)
        throw new ApolloError('failed to update user try again');

      // return the updated document
      return updatedAdmin;
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<Admin[]> {
    try {
      const admins = await this.adminModel.find();
      if (!admins) throw new ApolloError('no admins found');
      return admins;
    } catch (error) {
      return error;
    }

  }

  async getById(id: string): Promise<Admin> {
    try {
      const admin = await this.adminModel.findOne({ _id: id });
      if (!admin) throw new ApolloError('user not found');
      return admin;
    } catch (error) {
      return error;
    }
  }

  async delete(id: string): Promise<Admin> {
    try {
      const admin = await this.adminModel.findOne({ _id: id });
      if (!admin) throw new ApolloError('user not found');
      const deletedAdmin = await this.adminModel.findByIdAndDelete(id);
      if (!deletedAdmin) throw new ApolloError('failed to delete user');
      return deletedAdmin;
    } catch (error) {
      return error;
    }
  }
}
