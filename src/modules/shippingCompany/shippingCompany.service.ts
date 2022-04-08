import { UpdateShippingCompanyInput } from './dto/updateShippingCompany.input';
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
  
  async getAll(): Promise<ShippingCompany[]> {
    try {
        const shippingCompanies = await this.shippingCompanyModel.find();
        console.log(shippingCompanies);
        if(!shippingCompanies) throw new ApolloError('ShippingCompanies not found');
        return shippingCompanies;
    }catch(error) {
        return error;
    }
  }

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

  async updateShippingCompany( updateShippingCompanyInput : UpdateShippingCompanyInput): Promise<ShippingCompany> {
    try {

        const { id, ...restFields } = updateShippingCompanyInput;

        const doc = await this.shippingCompanyModel.findOne({ id });
        console.log(doc)
        if (!doc) throw new ApolloError('shipping company doesnt exist');

        const shippingCompany = await this.shippingCompanyModel.findByIdAndUpdate(id, { ...restFields }, { new: true });
        console.log("this is shipping company",shippingCompany)

        if(!shippingCompany) throw new ApolloError('ShippingCompany not updated');
        return shippingCompany;
    }catch(error) {
        return error;
    }
  }

  async getShippingCompanyById(id: string): Promise<ShippingCompany> {
    try {
        const shippingCompany = await this.shippingCompanyModel.findById(id);
        if(!shippingCompany) throw new ApolloError('ShippingCompany not found');
        return shippingCompany;
    }catch(error) {
        return error;
    }
  }

  async deleteShippingCompany(id: string): Promise<ShippingCompany> {
    try {
        const shippingCompany = await this.shippingCompanyModel.findOne({ _id : id});
        if(!shippingCompany) throw new ApolloError('ShippingCompany not found');
        const deletedShippingCompany = await this.shippingCompanyModel.findByIdAndDelete(id);
        if(!deletedShippingCompany) throw new ApolloError('ShippingCompany not deleted');
        return deletedShippingCompany;
    }catch(error) {
        return error;
    }
  }
}

