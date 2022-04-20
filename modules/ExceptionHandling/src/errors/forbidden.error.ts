import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorCodes, ErrorOptionsInterface, ErrorMessages } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class ForbiddenError extends BaseError {
  constructor({ error, message, level }: ErrorOptionsInterface) {
    super(HttpStatus.FORBIDDEN, message || ErrorMessages.forbidden, error);

    this.name = 'Permissions Error';
    this.code = ErrorCodes.permissionsError;
    this.level = ErrorLevel.warning;
  }
}
