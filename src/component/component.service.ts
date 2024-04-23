import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import configuration from 'config/configuration';
import { JwtService } from '@nestjs/jwt';
import { FirestoreService } from 'src/firestore/firestore.service';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { ColumnTable, ComponentRowTable, ResponsePaginatedData } from 'interfaces/response.interfaces';

@Injectable()
export class ComponentService {

  constructor(
    @InjectModel(Component.name)
    private readonly componentModel: Model<Component>,
    private readonly jwtService: JwtService,
    private readonly firestoreService: FirestoreService,

  ) { }

  async create(createComponentDto: CreateComponentDto, request: Request) {

    const token = request.headers.authorization;

    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: configuration().secretConstant
      }
    );

    const newComponent = await this.componentModel.create({ ...createComponentDto, clientId: payload.clientId })

    return newComponent;
  }


  async uploadImage(image: Express.Multer.File, id: string) {



    const response = await this.firestoreService.uploadImage(id + image.originalname, image.buffer, 'component')

    const urlImage = await this.firestoreService.getImageUrl(id + image.originalname, 'component')


    await this.componentModel.findByIdAndUpdate(id, { image: urlImage });
    return true

  }


  async findAll(paginationDto: PaginationDto) {


    const components = await this.componentModel.find({ clientId: paginationDto.clientId })
      .limit(paginationDto.limit)
      .skip(paginationDto.offset)

    const count = await this.componentModel.find({ clientId: paginationDto.clientId }).countDocuments();


    const rows: ComponentRowTable[] = components.map((c) => {
      return {
        key: c._id,
        image: c.image,
        name: c.name,
        option: null
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
        key: 'option',
        label: 'Acciones'
      }
    ]

    let responseData: ResponsePaginatedData = {
      columns,
      count,
      rows
    };

    return responseData;
  }

  async findClient(clientId: string) {

    return await this.componentModel.find({ clientId }, { name: 1, description: 1, image: 1, _id: 1 })
  }

  update(id: string, updateComponentDto: UpdateComponentDto) {

    return this.componentModel.findByIdAndUpdate(id, updateComponentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
