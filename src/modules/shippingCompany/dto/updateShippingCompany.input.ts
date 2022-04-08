import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


@InputType()
export class UpdateShippingCompanyInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    name?: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    description?: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    type?: string;
}