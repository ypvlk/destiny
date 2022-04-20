import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorCodes, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class UnauthorizedError extends BaseError {
  constructor({ error }: ErrorOptionsInterface) {
    super(HttpStatus.UNAUTHORIZED, 'Token has been expired', error);

    this.name = 'Auth Error';
    this.code = ErrorCodes.authError;
    this.level = ErrorLevel.error;
  }
}
