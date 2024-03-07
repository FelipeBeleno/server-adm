import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from 'interfaces/entities.interfaces';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {


    const roles: RolesEnum[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])

    const request = context.switchToHttp().getRequest();

    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException()
    }


    return true;
  }
}
