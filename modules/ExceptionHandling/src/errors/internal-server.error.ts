import { HttpStatus } from '@nestjs/common';

import { ErrorCodes, ErrorLevel, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class InternalServerError extends BaseError {
  constructor({ error, message }: ErrorOptionsInterface) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message || 'Internal server error', error);

    this.name = 'Internal Error';
    this.code = ErrorCodes.internalError;
    this.level = ErrorLevel.error;
  }
}
