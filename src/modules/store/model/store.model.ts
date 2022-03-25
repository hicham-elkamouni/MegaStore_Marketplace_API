import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/model/user.model';

@ObjectType()
@Schema({ timestamps: true })
export class Store {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => String)
  @Prop()
  profilePic: string;

  @Field(() => String)
  @Prop()
  coverPic: string;

  @Field(() => User)
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User;
}

export type StoreDocument = Store & Document;

export const StoreSchema = SchemaFactory.createForClass(Store);
