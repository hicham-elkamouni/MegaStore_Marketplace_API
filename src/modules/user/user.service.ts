import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { signUpInput } from './dto';
import { signInInput } from '../auth/dto/signin.input';
import { Auth } from '../auth/model/auth.model';

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
  async signIn(signInInput: signInInput): Promise<Auth> {
    try {
      const { email, password } = signInInput;

      // check the email provided
      const user = await this.userModel.findOne({ email });

      if (!user) throw new ApolloError('Email not found');
      // check the user password
      const passwordMatches = await argon.verify(user.hashedPassword, password);
      if (!passwordMatches) throw new ApolloError('password not correct');

      // create an access and a refresh token
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(user._id, user.roles, '15m', 'access'),
        this.authService.createToken(user._id, user.roles, '7d', 'refresh'),
      ]);

      // register the refresh token in the DB
      await this.updateRtHash(user._id, refresh_token);

      return { userId: user._id, token: access_token };
    } catch (error) {
      return error;
    }
  }
  /**
   * function for loginOut the user
   * @params {(userId,refreshToken)} takes the user ID and a refresh token
   * @returns {(Promise<User>)} returns the User
   * @memberof UsersService
   */
  async updateRtHash(userId: number, rt: string): Promise<User> {
    //hash the refreshToken
    const hashRerf = await argon.hash(rt);
    //register the refresh token in DB
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { hashedRt: hashRerf },
      { new: true },
    );
    return updated;
  }

  /**
   * function for loginOut the user
   * @params {(userId)} takes the user ID
   * @returns {(Promise<User>)} returns the loggedOut user and deletes his refresh token
   * @memberof UsersService
   */
  async logOut(userId: number): Promise<boolean> {
    //set the refresh token hash to null in the DB
    const updated = await this.userModel.findOneAndUpdate(
      { _id: userId, hashedRt: { $ne: null } },
      { hashedRt: null },
      { new: true },
    );
    if (updated) return true;
    return false;
  }

  /**
   * function for register new users
   * @params {(signupInput)} takes the user signup informations
   * @returns {(Promise<Auth>)} returns a an acces token and the userId and store a refresh token in DB
   * @memberof UsersService
   */
  async signUp(signUpInput: signUpInput): Promise<Auth> {
    try {
      const { email, password, phone, country, city, address, name } =
        signUpInput;

      const user = await this.userModel.findOne({ email });
      if (user) throw new ApolloError('email already exist');
      // hash the user password
      const hashedPassword = await argon.hash(password);
      // create the user
      const createdUser = await this.userModel.create({
        name,
        email,
        password,
        phone,
        country,
        city,
        address,
        hashedPassword,
      });
      if (!createdUser)
        throw new ApolloError('failed to create user try again');
      //create access and refresh
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(
          createdUser._id,
          createdUser.roles,
          '15m',
          'access',
        ),
        this.authService.createToken(
          createdUser._id,
          createdUser.roles,
          '7d',
          'refresh',
        ),
      ]);
      // register the refresh token in the DB
      await this.updateRtHash(createdUser._id, refresh_token);

      return { userId: createdUser._id, token: access_token };
    } catch (error) {
      return error;
    }
  }
}
