import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SellerRequestInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @Field()
    @IsString()
    @IsNotEmpty()
    request : string; 

}