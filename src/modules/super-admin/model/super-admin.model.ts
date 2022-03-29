import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class SuperAdmin {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  fullName: string;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  hashedPassword: string;

  @Field(() => String)
  @Prop()
  hashedRt: string;

  @Field(() => [String])
  @Prop({ default: ['superAdmin'] })
  permissions: string[];
}

export type SuperAdminDocument = SuperAdmin & Document;

export const SuperAdminSchema = SchemaFactory.createForClass(SuperAdmin);
