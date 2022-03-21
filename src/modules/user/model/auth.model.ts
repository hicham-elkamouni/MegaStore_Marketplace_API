import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  token: string;
}
