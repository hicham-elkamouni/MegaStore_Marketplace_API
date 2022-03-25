import { Admin } from "./model/admin.model";
import { Query, Resolver } from "@nestjs/graphql";
import { AdminService } from "./admin.service";


@Resolver('Admin')
export class AdminResolver {
    constructor(private adminService: AdminService) { }

    @Query(() => Admin)
    async getAll() {
        return 'getting all admins'
    }
}