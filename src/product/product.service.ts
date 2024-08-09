import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FirestoreService } from 'src/firestore/firestore.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    private readonly firestoreService: FirestoreService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createProductDto: CreateProductDto, request: Request) {




    return await this.productModel.create(createProductDto);
  }

  async uploadImage(image: Express.Multer.File, id: string) {

    console.log(image)

    const response = await this.firestoreService.uploadImage(id + image.originalname, image.buffer, 'product')

    const urlImage = await this.firestoreService.getImageUrl(id + image.originalname, 'product')


    await this.productModel.findByIdAndUpdate(id, { image: urlImage });
    return true

  }

  async findAll(clientId: string) {

    const response = await this.productModel.find({ clientId }).lean();

    return response;

  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    let response = await this.productModel.findByIdAndUpdate(id, updateProductDto).lean();
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
