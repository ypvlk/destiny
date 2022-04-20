import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validate } from 'uuid';

import { ForbiddenError } from '@destiny/exception-handling';

// This guard used full controller when we want to check userID
// We can off this guard if add no-user-id decorator on the one route

@Injectable()
export class UserIDGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const value = !!this.reflector.get<boolean>('noUserIdAccess', context.getHandler());
    if (value) return true;

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      // TODO
      // Situation when we dont have a token inside middleware
      return false;
    }

    if (!validate(user.id)) {
      throw new ForbiddenError({ message: 'User is unavailable' });
    }

    return true;
  }
}
