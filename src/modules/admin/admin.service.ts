import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './model/admin.model';
import { signinInput } from '../auth/dto/signin.input'
import { Model } from 'mongoose';
import { Auth } from '../auth/model/auth.model'
import { ApolloError } from 'apollo-server-express';
import { AuthService } from '../auth/auth.service';
import * as argon from 'argon2';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    private authService: AuthService
  ) {}

  /**
   * function for admin login
   * @params {(signinInput)} takes the admin credentials
   * @returns {(Promise<Auth>)} returns a an access token and the userId and store a refresh token in DB
   * @memberof UsersService
   */

  async signIn(signinInput : signinInput): Promise<Auth>{
    try {
      const { email , password } = signinInput;
      
      // check the email provided
      const admin = await this.adminModel.findOne({ email: email });
      if(!admin) throw new ApolloError('Email not found');
      
      //check the user 
      const passwordMatches = await argon.verify(admin.hash , password);
      if(!passwordMatches) throw new ApolloError('password not correct');

      // create an access and a refresh token
      const [access_token, refresh_token] = await Promise.all([
        this.authService.createToken( admin._id , admin.permissions, '15m' , 'access'),
        this.authService.createToken( admin._id , admin.permissions, '7d' , 'refresh')  
      ])

      // register the refresh token in the DB
      await this.updateRtHash(admin._id, refresh_token);

      return { userId : admin._id , token : access_token};
    }catch (error) {
      return error
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
}
