import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  @Auth([RolesEnum.ADMIN])
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Post('image')
  @Auth([RolesEnum.ADMIN])
  @UseInterceptors(FileInterceptor('image'))
  updateImage(@UploadedFile() image: Express.Multer.File, @Body('id') id: string) {
    return this.clientService.uploadImage(image, id)
  }

  @Get()
  @Auth([RolesEnum.ADMIN])
  findAll(@Query() paginationDto: PaginationDto) {
    return this.clientService.findAll(paginationDto);
  }


  @Get('select')
  @Auth([RolesEnum.ADMIN])
  findAllSelect() {
    return this.clientService.findAllSelect()
  }

  @Get(':id')
  @Auth([RolesEnum.ADMIN])
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Post(':id')
  @Auth([RolesEnum.ADMIN])
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    console.log('entro')
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Auth([RolesEnum.ADMIN])
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
