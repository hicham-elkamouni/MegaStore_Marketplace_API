import { IsNotEmpty, IsString } from "class-validator";
import { Field , InputType } from "@nestjs/graphql";

@InputType()
export class CreateShippingCompanyInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    description: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    type: string;
}