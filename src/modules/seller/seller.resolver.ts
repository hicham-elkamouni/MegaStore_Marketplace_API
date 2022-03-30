import { Seller } from './model/seller.model';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SellerService } from './seller.service';

import { Allowed } from '../auth/guards/Allowed.guard';
import {sellerInput} from './dto/seller.input';
@Resolver('Seller')
export class SellerResolver {
  constructor(
    private SellerService: SellerService,
    ) { }

  @Query(() => String)
  async getAll() {
    return 'test';
  }

  @Mutation(() => Seller, { name: 'createSeller' })
  async createSeller(@Args('sellerInput') sellerInput: sellerInput): Promise<any> {
    return this.SellerService.createSeller(sellerInput);
  }

//   @Mutation(() => Auth, { name: 'SellerLogin' })
//   async signIn(@Args('signinInput') signinInput: signinInput): Promise<Auth> {
//     return 
//   }

//   @Allowed(['Seller'])
//   @Mutation(() => Seller, { name: 'SellerLogout' })
//   async logOut(@Context('req') req: any): Promise<Seller> {
//     const userId = req.user?.userId;
//     return this.SellerService.logOut(userId);
//   }

//   @Mutation(() => Admin, { name: 'CreateAdmin' })
//   async createAdmin(@Args('adminInput') adminInput: adminInput): Promise<Admin> {
//     return this.adminService.create(adminInput);
//   }

}
