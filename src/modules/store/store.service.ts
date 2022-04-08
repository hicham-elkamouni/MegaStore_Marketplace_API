import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from './model/store.model';
import { Model } from 'mongoose';
import {storeInput} from './dto/store.input';

import { ApolloError } from 'apollo-server-express';
import * as argon from 'argon2';
import console from 'console';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private StoreModel: Model<StoreDocument>,
    // private StoreModel: Model<StoreDocument>
  ) {}
  /**
   * function for superAdmin login
   * @params {(signinInput)} takes the superAdmin credentials
   * @returns {(Promise<Auth>)} returns a an access token and the userId and store a refresh token in DB
   * @memberof UsersService
   */
   async createStore(storeInput: storeInput): Promise<any> {
    try {
    //  create a new seller    
  //  return  await this.StoreModel.create(storeInput);
       const { storeName, description, profilePic, coverPic, seller } = storeInput;
       const res = await this.StoreModel.create({
        storeName,
        description,
        profilePic,
        coverPic,
        seller,
      });
      console.log(storeName , description, profilePic, coverPic, seller);
      return res
    } catch (error) {
      return error;
    }
  }
}
