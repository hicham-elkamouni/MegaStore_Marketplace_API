import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export  class sellerInput {

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({nullable:true})
  @IsString()
  @IsNotEmpty()
  profilePic?: string;



  @Field({nullable:true})
  @IsString()
  @IsNotEmpty()
  document?: string;

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
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  storeName: string;
}
