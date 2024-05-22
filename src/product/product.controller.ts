import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @Auth([RolesEnum.ADMIN])
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() request: Request) {
    return this.productService.create(createProductDto, request);
  }


  @Post('image')
  @Auth([RolesEnum.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  updateImage(@UploadedFile() image: Express.Multer.File, @Body('id') id: string) {

    return this.productService.uploadImage(image, id);

  }



  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
