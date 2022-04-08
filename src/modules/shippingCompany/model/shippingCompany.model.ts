import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document , Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class ShippingCompany {

    @Field(() => String)
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

export type ShippingCompanyDocument = ShippingCompany & Document;

export const ShippingCompanySchema = SchemaFactory.createForClass(ShippingCompany);