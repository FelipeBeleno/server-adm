import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ClientService {


  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
    private readonly firestoreService: FirestoreService,
  ) { }

  async create(createClientDto: CreateClientDto) {

    try {

      const client = await this.findOneByEmail(createClientDto.email);

      if (client) {
        throw new BadRequestException('Cliente ya existe con ese email')
      }


      return await this.clientModel.create(createClientDto);

    } catch (error) {


      throw new BadRequestException(error)

    }

    return 'This action adds a new client';
  }

  async uploadImage(image: Express.Multer.File, id: string) {


    const response = await this.firestoreService.uploadImage(id+image.originalname, image.buffer, 'client')
    const urlImage = await this.firestoreService.getImageUrl(id+image.originalname, 'client')

    await this.clientModel.findByIdAndUpdate(id, { image: urlImage });
    return true

  }

  findAll() {
    return `This action returns all client`;
  }

  async findOneByEmail(email: string) {

    return await this.clientModel.findOne({ email })
  }
  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
