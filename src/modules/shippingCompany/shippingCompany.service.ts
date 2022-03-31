import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShippingCompany ,ShippingCompanyDocument } from './model/shippingCompany.model';
import { Model } from 'mongoose';


@Injectable()
export class ShippingCompanyService {
  constructor(
      @InjectModel(ShippingCompany.name)
      private shippingCompanyModel: Model<ShippingCompanyDocument>,
  ) { }
  
  
}

