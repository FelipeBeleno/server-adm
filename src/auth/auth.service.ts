import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async register(createUserDto: CreateUserDto) {

        const user = await this.userService.findOne(createUserDto.email)

        if (user) {
            throw new BadRequestException('Usuario ya existe');
        }

        let password = await bcryptjs.hash(createUserDto.password, 10)

        return await this.userService.create({ ...createUserDto, password })

    }
    async login(loginDto: LoginDto) {

        const user = await this.userService.findOne(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const payload = {
            name: user.name,
            role: user.role,
            email: user.email,
            image: user.image,
            clientId: user.clientId
        }

        let token = await this.jwtService.signAsync(payload);

        return {
            ...payload,
            token
        }
    }

}
