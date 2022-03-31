import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SellerAccountStatusInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    sellerStatus: string;

}