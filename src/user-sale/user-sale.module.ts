import { Module } from '@nestjs/common';
import { UserSaleService } from './user-sale.service';
import { UserSaleController } from './user-sale.controller';

@Module({
  controllers: [UserSaleController],
  providers: [UserSaleService],
})
export class UserSaleModule {}
