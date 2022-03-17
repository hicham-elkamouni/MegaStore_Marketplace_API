import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  age: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
