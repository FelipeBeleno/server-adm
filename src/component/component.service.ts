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


  findAll() {
    return `This action returns all component`;
  }

  async findClient(clientId: string) {
    return await this.componentModel.find({ clientId })
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
