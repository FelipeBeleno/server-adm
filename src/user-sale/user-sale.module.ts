import { Module } from '@nestjs/common';
import { UserSaleService } from './user-sale.service';
import { UserSaleController } from './user-sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSale, UserSaleSchema } from './entities/user-sale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSale.name,
        schema: UserSaleSchema
      }
    ])
  ],
  controllers: [UserSaleController],
  providers: [UserSaleService],
})
export class UserSaleModule {}
