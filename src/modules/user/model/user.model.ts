import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Cart } from './cart.model';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  hash: string;

  @Field(() => String)
  @Prop()
  hashRerf: string;

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
  @Prop({ default: ['customer'] })
  permissions: string[];

  @Field(() => Cart)
  @Prop()
  cart: Cart;

  @Field()
  @Prop()
  store: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
