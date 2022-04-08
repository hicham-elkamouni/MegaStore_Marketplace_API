import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import mongoose from 'mongoose';
import { Store } from 'src/modules/store/model/store.model';


@ObjectType()
@Schema({ timestamps: true })
export class Seller {
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
  role: string;

  @Field(() => String)
  @Prop({ required: true })
  status: string;

  @Field(() => String)
  @Prop({ required: true,unique: true })
  fiscale: string;

  @Field(() => String)
  @Prop({ required: true })
  hashedPassword: string;

  
  @Field(() => String)
  @Prop()
  hashedRt: string;

  @Field(() => Store)
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }] })
  store: Store;


}

export type SellerDocument = Seller & Document;

export const SellerSchema = SchemaFactory.createForClass(Seller);
