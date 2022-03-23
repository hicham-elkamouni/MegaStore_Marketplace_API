import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  hash: string;

  @Field(() => String, { nullable: true })
  @Prop()
  hashRerf?: string;

  @Field(() => String)
  @Prop()
  phone: string;

  @Field(() => String)
  @Prop()
  address: string;

  @Field(() => String)
  @Prop()
  city: string;

  @Field(() => String)
  @Prop()
  country: string;

  @Field(() => String)
  @Prop()
  document: string;

  @Field(() => [String])
  @Prop()
  permissions: string[];

  @Field()
  @Prop()
  cart: string;

  @Field()
  @Prop()
  store: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
