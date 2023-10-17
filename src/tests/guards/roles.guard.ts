import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { response } from 'express';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {
  }

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  async canActivate(
    context: ExecutionContext,
    //@ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    if(!request.headers.authorization){
      throw  new UnauthorizedException('Something went wrong', 'You must provide authorization token')
    }

    const token = request.headers.authorization.split(' ');

    const user = await this.authService.getUserByTokenData(token[1]);

    if (this.matchRoles(roles, user.role)) {
      return true;
    } else {
      throw new UnauthorizedException('Something went wrong', 'You must be an admin to use this route');
    }
  }
}