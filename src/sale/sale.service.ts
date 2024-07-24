import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid'
import { Product } from 'src/product/entities/product.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { chromium } from 'playwright';
import * as dayjs from 'dayjs'
import 'dayjs/locale/es';
import { UserSale } from 'src/user-sale/entities/user-sale.entity';
import { Client } from 'src/client/entities/client.entity';
import { Mode } from 'fs';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { ColumnTable, ResponsePaginatedData, SaleRowTable } from 'interfaces/response.interfaces';

@Injectable()
export class SaleService {


  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Sale.name)
    private readonly saleModel: Model<Sale>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>,
    @InjectModel(UserSale.name)
    private readonly userSale: Model<UserSale>,
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>
  ) {
    dayjs.locale('es');
  }

  async create(createSaleDto: CreateSaleDto) {

    let { products } = createSaleDto;
    let strError: string[] = [];

    for (const e of products) {
      const product = await this.productModel.findOne({ _id: e.productId }).lean();
      let { components } = product;

      let componentsRequired = components.map(c => ({
        componentId: c.componentId,
        stockRequired: c.stockRequired,
        name: c.name
      }));

      for (const comp of componentsRequired) {

        const stocks = await this.stockModel.find({ componentId: comp.componentId, status: true }).sort({ createdAt: 1 });

        let totalStock = stocks.reduce((ac, cv) => ac + cv.stock, 0);

        if (totalStock < comp.stockRequired * e.quantity) {
          strError.push(`El producto ${e.name} no cuenta con los componentes ${comp.name} necesarios en stock`);
        }

      }
    }

    if (strError.length > 0) {
      throw new BadRequestException(strError);
    }

    // validar stock

    for (const e of products) {
      const product = await this.productModel.findOne({ _id: e.productId }).lean();
      let { components } = product;

      let componentsRequired = components.map(c => ({
        componentId: c.componentId,
        stockRequired: c.stockRequired,
        name: c.name
      }));

      for (const comp of componentsRequired) {

        const stocks = await this.stockModel.find({ componentId: comp.componentId, status: true }).sort({ createdAt: 1 });

        let count = comp.stockRequired * e.quantity

        for (const st of stocks) {


          if (count > st.stock) {
            st.stock = 0
            count = count - st.stock
            st.status = false
          } else {
            st.stock = st.stock - count
            count = 0
          }

          await this.stockModel.findOneAndUpdate({ _id: st._id }, st)
        }

      }
    }


    let codeSale = nanoid(8);

    const newSale = await this.saleModel.create({
      ...createSaleDto,
      codeSale
    })


    return newSale;
  }

  async generatePdf(code: string): Promise<Buffer> {

    const saleData = await this.saleModel.findOne({ codeSale: code });


    const clientSale = await this.userSale.findById(saleData.userSale).lean()

    const clientData = await this.clientModel.findById(saleData.clientId);


    const html = `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura</title>
        <style>
          body { font-family: 'Roboto', sans-serif; margin: 0; padding: 0; background-color: #f4f7f6; }
          .container { width: 80%; margin: auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; background: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 10px; }
          .header img { max-width: 150px; height: auto; }
          .header h1 { margin: 0; font-size: 32px; color: #007bff; font-weight: 700; }
          .header p { margin: 5px 0; color: #555; font-size: 14px; }
          .section { margin-bottom: 10px; padding: 10px; background: #f9f9f9; border-radius: 8px; }
          .section h2 { font-size: 24px; margin-bottom: 15px; color: #333; }
          .details-table, .items-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          .details-table th, .details-table td, .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .details-table th, .items-table th { background-color: #007bff; color: #ffffff; }
          .items-table td, .details-table td { background-color: #ffffff; }
          .items-table td { text-align: right; }
          .items-table td.description { text-align: left; }
          .total-row { font-weight: 700; background-color: #f4f7f6; }
          .total-row td { text-align: right; }
          .footer { text-align: center; margin-top: 30px; border-top: 2px solid #007bff; padding-top: 10px; color: #555; }
          .footer p { margin: 5px 0; font-size: 14px; }
          .logo-container { display: flex; justify-content: center; align-items: center; margin-bottom: 10px; }
          .logo-container img { max-width: 100px; height: auto; }
          .company-info { text-align: center; }
          .company-info p { margin: 5px 0; font-size: 14px; color: #666; }
          .invoice-info { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .invoice-info div { width: 48%; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-container">
              <img src="${clientData.image ? clientData.image : 'https://via.placeholder.com/150'}" alt="${clientData.name}">
            </div>
            <div class="company-info">
              <h1>${clientData.name}</h1>
              <p>${clientData.address}</p>
              <p>Teléfono: ${clientData.phone}</p>
              <p>Email: ${clientData.email}</p>
            </div>
          </div>
          <div class="section invoice-info">
            <div>
              <h2>Detalles de la Factura</h2>
              <table class="details-table">
                <tr><th>Número de Factura</th><td>${saleData.codeSale}</td></tr>
                <tr><th>Fecha de Emisión</th><td>${dayjs(saleData.createdAt).format('D [de] MMMM [de] YYYY')}</td></tr>
                <tr><th>Fecha de Vencimiento</th><td>${dayjs(saleData.createdAt).format('D [de] MMMM [de] YYYY')}</td></tr>
              </table>
            </div>
            <div>
              <h2>Detalles del Cliente</h2>
              <table class="details-table">
                <tr><th>Nombre</th><td>${clientSale.name}</td></tr>
                <tr><th>Dirección</th><td>${clientSale.address}</td></tr>
                <tr><th>Teléfono</th><td>${clientSale.phone}</td></tr>
                <tr><th>Email</th><td>${clientSale.phone}</td></tr>
              </table>
            </div>
          </div>
          <div class="section">
            <h2>Artículos</h2>
            <table class="items-table">
              <thead>
                <tr><th>Descripción</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th></tr>
              </thead>
              <tbody>
              ${saleData.products.map(p => {
      return `<tr><td class="description">${p.name}</td><td>${p.quantity}</td><td>$${p.value}</td><td>$${p.valueTotal}</td></tr>`
    })}
              </tbody>
              <tfoot>
                <tr class="total-row"><td colspan="3">IVA (19%)</td><td>$${saleData.valueSaleIva}</td></tr>
                <tr class="total-row"><td colspan="3">Total</td><td>$${saleData.valueSale}</td></tr>
              </tfoot>
            </table>
          </div>
          <div class="footer">
            <p>Gracias por su compra. Para cualquier consulta, no dude en contactarnos.</p>
            <p>© 2024 Coffee Labs. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdfBuffer;
  }

  async findAll(paginationDto: PaginationDto, req: Request) {

    const token = req.headers.authorization;

    const payload = await this.jwtService.verifyAsync(
      token,
      {
        secret: configuration().secretConstant
      }
    );



    const sale = await this.saleModel.find({ clientId: payload.clientId })
      .limit(paginationDto.limit)
      .skip(paginationDto.offset)

    const count = await this.saleModel.find({ clientId: paginationDto.clientId }).countDocuments();


    const rows: SaleRowTable[] = sale.map((c) => {
      return {
        key: c._id,
        codeSale: c.codeSale,
        createdAt: dayjs(c.createdAt).format('D [de] MMMM [de] YYYY'),
        option: null
      }
    })

    let columns: ColumnTable[] = [
      {
        key: 'codeSale',
        label: 'Codigo'
      },
      {
        key: 'createdAt',
        label: 'Fecha'
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

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
