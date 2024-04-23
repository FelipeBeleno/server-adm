import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Request } from 'express';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaginationDto } from 'common/dtos/pagination.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  @Auth([RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN])
  findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    return this.stockService.findAll(paginationDto, req);
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
