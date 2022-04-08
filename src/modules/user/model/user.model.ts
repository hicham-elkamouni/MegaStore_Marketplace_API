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
  hashedPassword: string;

  @Field(() => String)
  @Prop()
  hashedRt: string;

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

  @Field(() => String)
<<<<<<< HEAD
  @Prop({enum:['pending','accepted', 'rejected'],default:'pending'})
  request : string; 

  @Field(() => String)
  @Prop({enum:['active' , 'inactive'],default:'inactive'})
=======
  @Prop({enum:['pending' , 'accepted' , 'rejected']})
  request : string; 

  @Field(() => String)
  @Prop({enum:['disabled' , 'active']})
>>>>>>> 53e9009d2fcaf22c3b8a1ffbb8d49a7618d1cc85
  sellerStatus : string; 

  @Field(() => [String])
  @Prop({ default: 'customer' })
  roles: string[];

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
