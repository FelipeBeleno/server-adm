import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ComponentService } from 'src/component/component.service';
import { ComponentModule } from 'src/component/component.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './entities/stock.entity';
import { Component, ComponentSchema } from 'src/component/entities/component.entity';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [ComponentModule,
    MongooseModule.forFeature([
      {
        name: Stock.name,
        schema: StockSchema
      },
      {
        name: Component.name,
        schema: ComponentSchema
      }
    ])
  ]
})
export class StockModule { }
