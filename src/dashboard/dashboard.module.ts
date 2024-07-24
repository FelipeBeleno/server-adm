import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from 'src/sale/entities/sale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sale.name,
        schema: SaleSchema
      }
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }
