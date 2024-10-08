import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { PackageModule } from './package/package.module';
import { UserModule } from './user/user.module';
import { UserSaleModule } from './user-sale/user-sale.module';
import { StockModule } from './stock/stock.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { FirestoreModule } from './firestore/firestore.module';
import { AuthModule } from './auth/auth.module';
import { ComponentModule } from './component/component.module';
import { DashboardModule } from './dashboard/dashboard.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(configuration().db_path),
    ClientModule,
    PackageModule,
    UserModule,
    UserSaleModule,
    StockModule,
    ProductModule,
    SaleModule,
    FirestoreModule,
    AuthModule,
    ComponentModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
