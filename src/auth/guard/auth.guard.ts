import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: configuration().secretConstant
        }
      );

      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }



    return true;

  }
}
