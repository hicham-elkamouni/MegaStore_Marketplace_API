import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Cart } from './cart.model';
import mongoose from 'mongoose';
import { Store } from 'src/modules/store/model/store.model';
import { Order } from 'src/modules/order/model/order.model';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop()
  profilePic: string;

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

  @Field(() => Store)
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }] })
  store: Store;

  @Field(() => [Order])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
