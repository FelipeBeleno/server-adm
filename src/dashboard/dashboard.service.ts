import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from 'src/sale/entities/sale.entity';
import { Model } from 'mongoose';
import * as ExcelJS from 'exceljs';

@Injectable()
export class DashboardService {

  constructor(
    @InjectModel(Sale.name)
    private readonly saleModel: Model<Sale>
  ) {

  }
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async reportDay(clientId: string) {


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await this.saleModel.find({ clientId, createdAt: { $gte: today } });


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');

    // Add column headers
    worksheet.columns = [
      { header: 'Codigo', key: 'codeSale', width: 10 },
      { header: 'Valor', key: 'valueSale', width: 30 },
      { header: 'Email usuario que registro', key: 'userRegister', width: 30 },
      { header: 'Productos', key: 'products' }
    ];

    data.forEach((d) => {
      worksheet.addRow({ codeSale: d.codeSale, valueSale: d.valueSale, userRegister: d.userRegister, products: d.products.map(p => p.name).toString() });
    })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;

  }

  async saleToday(clientId: string) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
    yesterday.setHours(0, 0, 0, 0)


    const dateMonth = new Date(today.getFullYear(), today.getMonth(), 1);



    const todaySale = await this.saleModel.aggregate([
      {
        $match: {
          clientId: clientId,
          createdAt: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          valueSale: { $sum: '$valueSale' }
        }
      }
    ])


    const yesterdaySale = await this.saleModel.aggregate([
      {
        $match: {
          clientId: clientId,
          createdAt: { $gte: yesterday, $lte: today }
        }
      },
      {
        $group: {
          _id: null,
          valueSale: { $sum: '$valueSale' }
        }
      }
    ])

    const monthSale = await this.saleModel.aggregate([
      {
        $match: {
          clientId: clientId,
          createdAt: { $gte: dateMonth, $lte: today }
        }
      },
      {
        $group: {
          _id: null,
          valueSale: { $sum: '$valueSale' }
        }
      }
    ])

    let starProduct = await this.saleModel.aggregate([


      {
        $match: {
          clientId: clientId,
          createdAt: { $gte: dateMonth }
        }
      },
      // Desenrollar el array de productos
      { $unwind: "$products" },

      // Agrupar por productId y nombre del producto, sumando las cantidades vendidas
      {
        $group: {
          _id: {
            productId: "$products.productId",
            name: "$products.name",
          },
          totalQuantity: { $sum: "$products.quantity" }
        }
      },

      // Ordenar los productos por la cantidad total vendida en orden descendente
      { $sort: { totalQuantity: -1 } },

      // Limitar el resultado a solo el producto con la mayor cantidad
      { $limit: 1 }
    ]);

    let starProductToday = await this.saleModel.aggregate([

      {
        $match: {
          clientId: clientId,
          createdAt: { $gte: today }
        }
      },

      // Desenrollar el array de productos
      { $unwind: "$products" },

      // Agrupar por productId y nombre del producto, sumando las cantidades vendidas
      {
        $group: {
          _id: {
            productId: "$products.productId",
            name: "$products.name",
          },
          totalQuantity: { $sum: "$products.quantity" }
        }
      },

      // Ordenar los productos por la cantidad total vendida en orden descendente
      { $sort: { totalQuantity: -1 } },

      // Limitar el resultado a solo el producto con la mayor cantidad
      { $limit: 1 }
    ]);

    let coutnSales = await this.saleModel.find({ clientId, createdAt: { $gte: dateMonth } }).countDocuments()

    let starProductTodayFinal = {
      name: starProductToday[0]._id.name,
      totalQuantity: starProductToday[0].totalQuantity
    }
    

    let starProductFinal = {
      name: starProduct[0]._id.name,
      totalQuantity: starProduct[0].totalQuantity
    }
    return {
      todaySale: todaySale[0].valueSale ? todaySale[
        0
      ].valueSale : 0,
      yesterdaySale: yesterdaySale[
        0
      ] ? yesterdaySale[
        0
      ].valueSale : 0,
      monthSale: monthSale[0].valueSale ? monthSale[0].valueSale : 0,
      starProductFinal,
      coutnSales,
      starProductTodayFinal
    }

  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
