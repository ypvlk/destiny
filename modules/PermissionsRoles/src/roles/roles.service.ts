import logger from '@destiny/logger';
import { ForbiddenError } from '@destiny/exception-handling';
import { RolesActions } from './roles.constant';

interface IRolesService {
  matchRoles(roles: string, userRole: string): Promise<boolean>;
}

export class RolesService implements IRolesService {
  private logger = logger.child('roles-match-logger');

  public async matchRoles(role: string, userRole: string): Promise<boolean> {
    try {
      return RolesActions[role].includes(userRole);
    } catch (e) {
      this.logger.error('Permissions Error', { role, userRole }, { message: e.message, stack: e.stack });

      throw new ForbiddenError(e);
    }
  }
}
