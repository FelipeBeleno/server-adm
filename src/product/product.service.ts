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

    const response = await this.firestoreService.uploadImage(id + image.originalname, image.buffer, 'product')

    const urlImage = await this.firestoreService.getImageUrl(id + image.originalname, 'product')


    await this.productModel.findByIdAndUpdate(id, { image: urlImage });
    return true

  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
