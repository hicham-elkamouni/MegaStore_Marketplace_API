import { ShippingCompany, ShippingCompanySchema } from './model/shippingCompany.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ShippingCompanyService } from './shippingCompany.service';
import { ShippingCompanyResolver } from './shippingCompany.resolver';


@Module({
    imports : [ MongooseModule.forFeature([{ name : ShippingCompany.name, schema : ShippingCompanySchema }]) 
    ],
    providers : [ShippingCompanyService, ShippingCompanyResolver]
})

export class ShippingCompanyModule {}