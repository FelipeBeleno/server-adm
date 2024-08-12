import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Auth([RolesEnum.ADMIN])
  @Get('saleToday/:clientId')
  async findSaleToday(@Param('clientId') clientId: string) {
    return await this.dashboardService.saleToday(clientId)
  }

  @Auth([RolesEnum.ADMIN])
  @Get('reportDay/:clientId')
  async findReportDay(@Param('clientId') clientId: string, @Res() res: Response) {



    const buffer = await this.dashboardService.reportDay(clientId);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');


    return res.send(buffer);
  }



}
