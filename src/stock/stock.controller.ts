import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { RequestUser } from 'interfaces/requests.interfaces';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  @Auth([ RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN])
  findAll(@Req() req: RequestUser) {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
