import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Request } from 'express';
import configuration from 'config/configuration';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { ComponentService } from 'src/component/component.service';
import { Model } from 'mongoose';
import { Stock } from './entities/stock.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Component } from 'src/component/entities/component.entity';
import { ColumnTable, ResponsePaginatedData, StockRowTable } from 'interfaces/response.interfaces';

@Injectable()
export class StockService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly componentService: ComponentService,
    @InjectModel(Component.name)
    private readonly componentModel: Model<Component>,
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>
  ) {

  }
  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  async findAll(paginationDto: PaginationDto, req: Request) {

    const token = req.headers.authorization;

    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: configuration().secretConstant
      }
    );

    let components = await this.componentModel.find({ clientId: paginationDto.clientId })
      .limit(paginationDto.limit)
      .skip(paginationDto.offset)


    const stock = await this.stockModel.aggregate([
      {
        $group: {
          _id: "$materialId",
          stock: { $sum: "$stock" }
        }
      }

    ]);

    let componentsHeaders = components.map(c => {

      let [count] = stock.filter(s => s._id.toString() === c._id.toString());
      return {
        _id: c._id,
        name: c.name,
        image: c.image,
        count: count !== undefined ? count.stock : 0
      }
    });

    const count = await this.componentModel.find({ clientId: paginationDto.clientId }).countDocuments();


    const rows: StockRowTable[] = componentsHeaders.map((c) => {
      return {
        key: c._id,
        image: c.image,
        name: c.name,
        count: c.count,
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
        key: 'count',
        label: 'cantidad'
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

    return responseData
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
