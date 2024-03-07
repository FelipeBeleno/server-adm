import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }


  async findOne(email: string) {
    return await this.userModel.findOne({ email });

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
