import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document , Schema as MongooseSchema } from 'mongoose';

export class ShippingCompany {

    @Field()
    @Prop({ required: true })
    _id: MongooseSchema.Types.ObjectId;
    
    @Field(() => String)
    @Prop({ required: true })
    name: string;

    @Field(() => String)
    @Prop({ required: true })
    description: string;

    @Field(() => String)
    @Prop({ enum : ['Standard', 'Express']})
    type: string;
}