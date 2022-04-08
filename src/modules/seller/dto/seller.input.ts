import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class sellerInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    hashedPassword: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    status: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    fiscale: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    role: string;

}