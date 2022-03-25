import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose'


@ObjectType()
@Schema({ timestamps: true})
export class Admin {
    @Field(()=> String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(()=> String)
    @Prop({ required: true })
    fullName : string;

    @Field(()=>String)
    @Prop({ required: true , unique: true })
    email : string;

    @Field(()=>String)
    @Prop({ required: true})
    hash : string;

    @Field(()=>String)
    @Prop()
    hashRef: string;
}

export type AdminDocument = Admin & Document;

export const AdminSchema = SchemaFactory.createForClass(Admin);