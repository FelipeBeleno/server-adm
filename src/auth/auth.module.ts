import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'config/configuration';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configuration().secretConstant,
      signOptions: { expiresIn: '4h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
