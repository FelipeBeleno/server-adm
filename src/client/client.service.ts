import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';
import { FirestoreService } from 'src/firestore/firestore.service';
import { PaginationDto, } from 'common/dtos/pagination.dto';
import { ClientRowTable, ColumnTable, ResponsePaginatedData } from 'interfaces/response.interfaces';

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


    const response = await this.firestoreService.uploadImage(id + image.originalname, image.buffer, 'client')
    const urlImage = await this.firestoreService.getImageUrl(id + image.originalname, 'client')

    await this.clientModel.findByIdAndUpdate(id, { image: urlImage });
    return true

  }

  async findAll(paginationDto: PaginationDto) {
    const clients = await this.clientModel.find()
      .limit(paginationDto.limit)
      .skip(paginationDto.offset)


    const count = await this.clientModel.find().countDocuments();

    const rows: ClientRowTable[] = clients.map((c, i) => {
      return {
        key: i,
        image: c.image,
        name: c.name,
        email: c.email,
        document: `${c.documentType} ${c.document}`,
        status: c.status ? 'Activo' : 'Inactivo'
      }
    })


    let columns: ColumnTable[] = [
      {
        key: 'image',
        label: 'Imagen'
      },
      {
        key: 'name',
        label: 'Nombre'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'document',
        label: 'Documento'
      },
      {
        key: 'status',
        label: 'Estado'
      },
    ]

    let responseData: ResponsePaginatedData = {
      columns,
      count,
      rows
    };


    return responseData


  }

  async findOneByEmail(email: string) {

    return await this.clientModel.findOne({ email })
  }

  async findAllSelect() {
    return this.clientModel.find({}, {
      _id: 1,
      name: 1,
      image: 1
    })
  }


  async findOne(id: string) {
    return await this.clientModel.findById(id, { __v: 0, paymentHistory: 0, _id: 0, updatedAt:0, createdAt:0 });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await this.clientModel.findByIdAndUpdate(id, updateClientDto);
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
