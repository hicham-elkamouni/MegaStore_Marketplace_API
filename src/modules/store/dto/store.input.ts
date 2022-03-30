import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Prop,Schema as MongooseSchema } from '@nestjs/mongoose';


@InputType()
export class storeInput {
   
  
    @Field(() => String)
    @Prop({  unique: true })
    name: string;
  
    @Field(() => String)
    @Prop()
    description: string;
  
    @Field(() => String)
    @Prop()
    profilePic: string;
  
    @Field(() => String)
    @Prop()
    coverPic: string;

    @Field(() => String)
    @Prop()
    user: string;
  

}