import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Brand } from 'src/modules/brand/model/brand.model';
import { Category } from 'src/modules/category/model/category.model';
import { Store } from 'src/modules/store/model/store.model';

@ObjectType()
@Schema({ timestamps: true })
export class Product {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => [String])
  @Prop({ required: true })
  pictures: string[];

  @Field(() => Number)
  @Prop({ required: true })
  price: number;

  

  // @Field(() => String)
  // @Prop({ required: true })
  // status: string;

  // @Field(() => Category)
  // @Prop({ required: true })
  // category: Category;

  // @Field(() => Store)
  // @Prop({ required: true })
  // store: Store;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
