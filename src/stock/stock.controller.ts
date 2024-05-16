import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Request } from 'express';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { ValidateIdMongoPipe } from 'common/pipes/isMongoId';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  @Auth([RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN])
  create(@Body() createStockDto: CreateStockDto) {
    
    return this.stockService.create(createStockDto);
  }

  @Get()
  @Auth([RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN])
  findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    return this.stockService.findAll(paginationDto, req);
  }

  @Get(':id')
  @Auth([RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN])
  componentAll(@Param('id', ValidateIdMongoPipe) id: string) {
    return this.stockService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id', ValidateIdMongoPipe) id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
