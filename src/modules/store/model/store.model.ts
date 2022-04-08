import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Seller } from 'src/modules/seller/model/seller.model';


@ObjectType()
@Schema({ timestamps: true })
export class Store {
  
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  storeName: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop()
  profilePic: string;

  @Field(() => String)
  @Prop()
  coverPic: string;

  
  @Field(() => Seller)
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' } })
  seller: Seller;
}


export type StoreDocument = Store & Document;

export const StoreSchema = SchemaFactory.createForClass(Store);

