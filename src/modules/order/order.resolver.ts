
import { Resolver, Query } from '@nestjs/graphql';

import { Order } from './model/order.model';
import { OrderService } from './order.service';



@Resolver('Order')
export class orderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => Order)
  async getAll() {
    return 'test';
  }


}
