import { Query , Resolver } from "@nestjs/graphql";
import { ShippingCompany } from "./model/shippingCompany.model";
import { ShippingCompanyService } from "./shippingCompany.service";



@Resolver('ShippingCompany')
export class ShippingCompanyResolver {
    constructor(private shippingCompanyService: ShippingCompanyService) {}

    @Query(() => ShippingCompany)
    async getAll() {
        return 'getting all shipping companies';
    }

    
}