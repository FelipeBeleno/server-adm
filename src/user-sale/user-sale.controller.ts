import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSaleService } from './user-sale.service';
import { CreateUserSaleDto } from './dto/create-user-sale.dto';
import { UpdateUserSaleDto } from './dto/update-user-sale.dto';
import { ValidateIdMongoPipe } from 'common/pipes/isMongoId';

@Controller('user-sale')
export class UserSaleController {
  constructor(private readonly userSaleService: UserSaleService) { }

  @Post()
  create(@Body() createUserSaleDto: CreateUserSaleDto) {
    return this.userSaleService.create(createUserSaleDto);
  }

  @Get()
  findAll() {
    return this.userSaleService.findAll();
  }

  @Get(':document/:clientId')
  findOne(@Param('document') document: string, @Param('clientId', ValidateIdMongoPipe) clientId: string) {
    return this.userSaleService.findOne(document, clientId);
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
