import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { UploadService } from "../upload/upload.service";
import { CreateProduct } from "./dto/product.input";
import { Product } from "./model/product.model";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver {
    constructor(private productService:ProductService ,private uploaService:UploadService){}
    @Mutation(()=>Boolean)
    async addProduct(@Args({ name: 'file', type: () => [GraphQLUpload] })
    files: FileUpload,@Args('createProduct') createProduct:CreateProduct) {
        // const test=await files
        // console.log(test);
        // console.log(createProduct)
        // const filesToUpload=await files 
        const pictures= await this.uploaService.uploadFiles(files)
        console.log(pictures);
        return true
        return this.productService.addProduct(createProduct);
    }
}