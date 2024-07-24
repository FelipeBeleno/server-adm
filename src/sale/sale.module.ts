import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './entities/sale.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Stock, StockSchema } from 'src/stock/entities/stock.entity';
import { UserSale, UserSaleSchema } from 'src/user-sale/entities/user-sale.entity';
import { Client, ClientSchema } from 'src/client/entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sale.name,
        schema: SaleSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: Stock.name,
        schema: StockSchema
      },
      {
        name: UserSale.name,
        schema: UserSaleSchema
      },
      {
        name: Client.name,
        schema: ClientSchema
      },

    ])

  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule { }
