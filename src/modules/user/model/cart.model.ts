import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/modules/product/model/product.model';

@ObjectType()
export class Cart {
  @Field(() => Product)
  product: Product;

  @Field(() => Int)
  quantity: number;
}
