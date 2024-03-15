import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly firestoreService: FirestoreService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const user = await this.findOne(createUserDto.email);

    if (user) throw new BadRequestException('Usuario ya existe');

    let newUser = await this.userModel.create(createUserDto);

    return newUser

  }


  async uploadImage(image: Express.Multer.File, id: string) {

    
    
    const response = await this.firestoreService.uploadImage(id + image.originalname, image.buffer, 'user')

    const urlImage = await this.firestoreService.getImageUrl(id + image.originalname, 'user')


    await this.userModel.findByIdAndUpdate(id, { image: urlImage });
    return true

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
