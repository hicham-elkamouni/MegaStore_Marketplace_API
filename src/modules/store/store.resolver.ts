// import { store } from './model/store.model';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { StoreService } from './store.service';

import { Allowed } from '../auth/guards/Allowed.guard';
@Resolver('Store')
export class StoreResolver {
  constructor(
    private StoreService: StoreService,
    ) { }

  @Query(() => String)
  async testStore() {
    return 'test';
  }

}
