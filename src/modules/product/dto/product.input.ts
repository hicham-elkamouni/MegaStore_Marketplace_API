import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


@InputType()
export class CreateProduct {

    @Field()
    @IsString()
    @IsNotEmpty()
    title: string;


    @Field()
    @IsString()
    @IsNotEmpty()
    description: string;


    @Field()
    @IsNumber()
    price: number;

}
