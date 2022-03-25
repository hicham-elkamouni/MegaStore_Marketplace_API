import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Category {
  @Field(() => String)
  @Prop({ required: true, unique: true })
  _id: string;

  @Field(() => [String])
  @Prop({ required: true, default: [] })
  ancestors: string[];

  @Field(() => String, { nullable: true })
  @Prop({ required: true, default: null })
  parent: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
