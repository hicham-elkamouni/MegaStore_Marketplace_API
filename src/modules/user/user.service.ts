import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { Model } from 'mongoose';
import { signinInput } from './dto';
import { Auth } from './model/auth.model';
import { AuthService } from '../auth/auth.service';
import { ApolloError } from 'apollo-server-express';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}
  async signIn(signinInput: signinInput): Promise<Auth> {
    try {
      const { email, password } = signinInput;

      const user = await this.userModel.findOne({ email });
      console.log(user);

      if (!user) throw new ApolloError('Email not found');

      const passwordMatches = await argon.verify(user.hash, password);
      if (!passwordMatches) throw new ApolloError('password not correct');

      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken(user._id, ['customer'], '15m'),
        this.authService.createToken(user._id, ['customer'], '7d'),
      ]);

      return { userId: user._id, token: access_token };
    } catch (error) {
      return error;
    }
  }
}
