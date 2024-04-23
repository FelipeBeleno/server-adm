import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateIdMongoPipe } from 'common/pipes/isMongoId';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService,
    


  ) { }

  @Post()
  @Auth([])
  create(@Body() createComponentDto: CreateComponentDto, @Req() request: Request) {
    return this.componentService.create(createComponentDto, request);
  }


  @Post('image')
  @Auth([])
  @UseInterceptors(FileInterceptor('image'))
  updateImage(@UploadedFile() image: Express.Multer.File, @Body('id') id: string) {
    return this.componentService.uploadImage(image, id)
  }


  @Get()
  @Auth([])
  findAll(@Query() paginationDto: PaginationDto) {
    return this.componentService.findAll(paginationDto);
  }


  @Get(':clientId')
  findClient(@Param('clientId', ValidateIdMongoPipe) clientId: string) {
    return this.componentService.findClient(clientId);
  }

  @Post(':id')
  update(@Param('id', ValidateIdMongoPipe) id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentService.update(id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentService.remove(+id);
  }
}
