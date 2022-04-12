import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UploadModule } from "../upload/upload.module";
import { Product, ProductSchema } from "./model/product.model";
import { ProductResolver } from "./product.resolver";
import { ProductService } from "./product.service";

@Module({
    imports:[
      MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      UploadModule
    ],
    providers: [ProductResolver,ProductService],
  })
  
export class ProductModule {}
  