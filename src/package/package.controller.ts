import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'interfaces/entities.interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiBearerAuth()
@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Post()
  @Auth([RolesEnum.ADMIN])
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @Get()
  @Auth([RolesEnum.ADMIN])
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  @Auth([RolesEnum.ADMIN])
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(+id);
  }

  @Patch(':id')
  @Auth([RolesEnum.ADMIN])
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  @Auth([RolesEnum.ADMIN])
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
