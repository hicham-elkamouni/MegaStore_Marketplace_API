import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingCompany ,ShippingCompanyDocument } from './model/shippingCompany.model';
import { Model } from 'mongoose';
import { CreateShippingCompanyInput } from './dto';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class ShippingCompanyService {
  constructor(
      @InjectModel(ShippingCompany.name)
      private shippingCompanyModel: Model<ShippingCompanyDocument>,
  ) { }
  
  async create(createShippingCompanyInput : CreateShippingCompanyInput): Promise<ShippingCompany> {
    try {
        const { name, description, type } = createShippingCompanyInput;

        const doc = await this.shippingCompanyModel.findOne({ name , type});
        if (doc) throw new ApolloError('ShippingCompany already exists');

        const shippingCompany = await this.shippingCompanyModel.create({ name, description, type });

        if(!shippingCompany) throw new ApolloError('ShippingCompany not created');
        return shippingCompany;
    }catch(error) {
        return error;
    }
  }
}

