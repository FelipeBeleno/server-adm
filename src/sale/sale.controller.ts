import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Req } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Request, Response } from 'express';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('sale')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Post()
  @Auth([RolesEnum.ADMIN])
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  @Auth([RolesEnum.ADMIN])
  findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {

    return this.saleService.findAll(paginationDto, req);
  }
  /*
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.saleService.findOne(+id);
    }*/

  @Patch(':id')
  @Auth([RolesEnum.ADMIN])
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @Auth([RolesEnum.ADMIN])
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
  @Post('pdf')
  @Auth([RolesEnum.ADMIN])
  async generatePdf(@Body('code') code: string, @Res() res: Response) {
    const pdfBuffer = await this.saleService.generatePdf(code);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=download.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }

}
