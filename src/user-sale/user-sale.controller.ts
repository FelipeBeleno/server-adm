import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSaleService } from './user-sale.service';
import { CreateUserSaleDto } from './dto/create-user-sale.dto';
import { UpdateUserSaleDto } from './dto/update-user-sale.dto';

@Controller('user-sale')
export class UserSaleController {
  constructor(private readonly userSaleService: UserSaleService) {}

  @Post()
  create(@Body() createUserSaleDto: CreateUserSaleDto) {
    return this.userSaleService.create(createUserSaleDto);
  }

  @Get()
  findAll() {
    return this.userSaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSaleDto: UpdateUserSaleDto) {
    return this.userSaleService.update(+id, updateUserSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSaleService.remove(+id);
  }
}
