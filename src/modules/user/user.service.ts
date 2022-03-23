import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { signinInput } from './dto';
import { Auth } from './model/auth.model';

import { ApolloError } from 'apollo-server-express';
import * as argon from 'argon2';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  /**
   * function for login the user
   * @params {(signinInput)} takes the user credentials
   * @returns {(Promise<Auth>)} returns a an acces token and the userId and store a refresh token in DB
   * @memberof UsersService
   */
  async signIn(signinInput: signinInput): Promise<Auth> {
    try {
      const { email, password } = signinInput;

      // check the email provided
      const user = await this.userModel.findOne({ email });

      if (!user) throw new ApolloError('Email not found');
      // check the user password
      const passwordMatches = await argon.verify(user.hash, password);
      if (!passwordMatches) throw new ApolloError('password not correct');

      // create an access and a refresh token
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(user._id, ['customer'], '15m'),
        this.authService.createToken(user._id, ['customer'], '7d'),
      ]);

      // register the refresh token in the DB
      await this.updateRtHash(user._id, refresh_token);

      return { userId: user._id, token: access_token };
    } catch (error) {
      return error;
    }
  }

  async updateRtHash(userId: number, rt: string): Promise<User> {
    //hash the refreshToken
    const hashRerf = await argon.hash(rt);
    //register the refresh token in DB
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { hashRerf },
      { new: true },
    );
    return updated;
  }

  async logOut(userId: number): Promise<User> {
    //set the refresh token hash to null in the DB
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { hashRerf: null },
      { new: true },
    );

    return updated;
  }
}
