import { ShippingCompanyModule } from './../shippingCompany/shippingCompany.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '../config/configuration.module';
import { ConfigService } from '../config/configuration.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { SuperAdminModule } from '../super-admin/super-admin.module';
import { AdminModule } from '../admin/admin.module';
import { UploadModule } from '../upload/upload.module';
import { SellerModule } from '../seller/seller.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.mongoUri,
        };
        return options;
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoTransformHttpErrors: true,
    }),
    UserModule,
    AuthModule,
    OrderModule,
    SuperAdminModule,
    AdminModule,
    UploadModule,
    SellerModule,
    StoreModule,
    ShippingCompanyModule
  ],
})
export class AppModule {}
