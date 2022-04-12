import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./model/product.model";
import { Model } from 'mongoose';
import { CreateProduct } from "./dto/product.input";
import { log } from "console";
@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name)
    private productModel: Model<ProductDocument>){}

    async addProduct(createProduct:CreateProduct){
        console.log(createProduct);
        
    }

}