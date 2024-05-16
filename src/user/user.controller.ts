import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateIdMongoPipe } from 'common/pipes/isMongoId';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Auth([])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Post('image')
  @Auth([])
  @UseInterceptors(FileInterceptor('image'))
  updateImage(@UploadedFile() image: Express.Multer.File, @Body('id') id: string) {
    return this.userService.uploadImage(image, id)
  }





  @Get()
  @Auth([])
  findAll() {

    return this.userService.findAll()
  }


  @Get(':id')
  @Auth([])
  getUserById(@Param('id', ValidateIdMongoPipe) id: string) {


    return true
  }


  @Post(':id')
  update(@Param('id', ValidateIdMongoPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
