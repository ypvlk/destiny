import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private rolesService: RolesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (!role) return true;

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      // TODO
      // Situation when we dont have a token inside middleware
      return false;
    }
    return this.rolesService.matchRoles(role, user.role);
  }
}
