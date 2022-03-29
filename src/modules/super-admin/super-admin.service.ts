import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin, SuperAdminDocument } from './model/super-admin.model';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/model/auth.model';
import { signInInput } from '../auth/dto/signin.input';
import { ApolloError } from 'apollo-server-express';
import * as argon from 'argon2';
@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superAdminModel: Model<SuperAdminDocument>,
    private authService: AuthService,
  ) {}

  /**
   * function for superAdmin login
   * @params {(signinInput)} takes the superAdmin credentials
   * @returns {(Promise<Auth>)} returns a an access token and the userId and store a refresh token in DB
   * @memberof UsersService
   */

  async signIn(signinInput: signInInput): Promise<Auth> {
    try {
      const { email, password } = signinInput;

      // check the email provided
      const doc = await this.superAdminModel.findOne({ email });
      if (!doc) throw new ApolloError('Email not found');

      // check the password
      const passwordMatches = await argon.verify(doc.hash, password);
      if (!passwordMatches) throw new ApolloError('password not correct');

      // create an access and a refresh token
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(doc._id, doc.permissions, '15m', 'access'),
        this.authService.createToken(doc._id, doc.permissions, '7d', 'refresh'),
      ]);

      // register the refresh token in the DB
      await this.updateRtHash(doc._id, refresh_token);

      return { userId: doc._id, token: access_token };
    } catch (error) {
      return error;
    }
  }

  async updateRtHash(userId: number, rt: string): Promise<SuperAdmin> {
    //hash the refreshToken
    const hashRef = await argon.hash(rt);
    //register the refresh token in DB
    const updated = await this.superAdminModel.findOneAndUpdate(
      { _id: userId },
      { hashRef },
      { new: true },
    );
    return updated;
  }

  async logOut(userId: number): Promise<SuperAdmin> {
    //set the refresh token hash to null in the DB

    const updated = await this.superAdminModel.findOneAndUpdate(
      { _id: userId },
      { hashRef: null },
      { new: true },
    );

    return updated;
  }
}
