import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserSaleDto } from './dto/create-user-sale.dto';
import { UpdateUserSaleDto } from './dto/update-user-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSale } from './entities/user-sale.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserSaleService {

  constructor(
    @InjectModel(UserSale.name)
    private readonly userSaleModel: Model<UserSale>
  ) {

  }

  async create(createUserSaleDto: CreateUserSaleDto) {


    let userExist = await this.userSaleModel.findOne({ clientId: createUserSaleDto.clientId, document: createUserSaleDto.document });

    if (userExist) throw new BadRequestException('Cliente ya existe');

    let newUserSale = await this.userSaleModel.create(createUserSaleDto);

    return newUserSale;
  }

  findAll() {
    return `This action returns all userSale`;
  }

  async findOne(document: string, clientId: string) {

    let userExist = await this.userSaleModel.findOne({ clientId: clientId, document: document });

    if (!userExist) throw new BadRequestException('Cliente no existe');

    return userExist;
  }

  update(id: number, updateUserSaleDto: UpdateUserSaleDto) {
    return `This action updates a #${id} userSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSale`;
  }
}
