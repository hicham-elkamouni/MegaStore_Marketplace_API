import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './model/order.model';
import { orderResolver } from './order.resolver';
import { OrderService } from './order.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
    providers: [orderResolver, OrderService]

})
export class OrderModule { }
