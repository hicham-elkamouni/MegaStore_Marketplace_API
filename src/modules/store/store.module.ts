import { Module } from '@nestjs/common';
// import { SellerService } from './seller.service';
// import { SellerResolver } from './seller.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './model/store.model';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
// import { StoreModel } from './model/store.model';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
    ]),
    AdminModule
  ],
  providers: [StoreService, StoreResolver],
  exports: [StoreService]
 
})
export class StoreModule {}
