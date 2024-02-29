import { Injectable } from '@nestjs/common';
import { CreateUserSaleDto } from './dto/create-user-sale.dto';
import { UpdateUserSaleDto } from './dto/update-user-sale.dto';

@Injectable()
export class UserSaleService {
  create(createUserSaleDto: CreateUserSaleDto) {
    return 'This action adds a new userSale';
  }

  findAll() {
    return `This action returns all userSale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSale`;
  }

  update(id: number, updateUserSaleDto: UpdateUserSaleDto) {
    return `This action updates a #${id} userSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSale`;
  }
}
