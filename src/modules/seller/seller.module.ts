import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerResolver } from './seller.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './model/seller.model';
import { StoreModule } from '../store/store.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seller.name, schema: SellerSchema },
    ]),
    StoreModule
  ],
  providers: [SellerService, SellerResolver],
})
export class SellerModule {}
