import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../utils/roles.enum';
import { ROLES_KEY } from '../../utils/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {

    const requiresRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiresRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiresRoles.some((role) => user.role.includes(role));
  }
}