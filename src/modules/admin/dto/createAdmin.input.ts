import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType()
export class CreateAdminInput {
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
}
