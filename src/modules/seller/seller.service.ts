import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seller, SellerDocument } from './model/seller.model';
// import { Store, StoreDocument } from '../store/model/store.model';
import { Model } from 'mongoose';
import { ApolloError } from 'apollo-server-express';
import {sellerInput} from './dto/seller.input';
import {StoreService} from '../store/store.service';

import * as argon from 'argon2';
@Injectable()
export class SellerService {
  constructor(
    @InjectModel(Seller.name)
    private SellerModel: Model<SellerDocument>,
    private StoreService: StoreService
  ) {}
 

  /**
   * function for superAdmin login
   * @params {(signinInput)} takes the superAdmin credentials
   * @returns {(Promise<Auth>)} returns a an access token and the userId and store a refresh token in DB
   * @memberof UsersService
   */

   async createSeller(sellerInput: sellerInput): Promise<any> {
    try {
    //  create a new seller  
    const  {password} = sellerInput;
    sellerInput.hashedPassword = await argon.hash(password);
      const { _id } = await this.SellerModel.create(sellerInput);
      console.log( _id );

      await this.StoreService.createStore( _id );
        
    } catch (error) {
      return error;
    }
  }

}
