import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { CreateAdminInput } from './createAdmin.input';
import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


@InputType()
export class UpdateAdminInput {

    @Field()
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    fullName?: string;

    @Field({nullable:true})
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field({nullable:true})
    @IsString()
    @IsOptional()
    password?: string;
}