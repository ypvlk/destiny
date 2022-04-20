import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorCodes, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class NotFoundError extends BaseError {
  constructor({ error, message, level }: ErrorOptionsInterface) {
    super(HttpStatus.NOT_FOUND, message || 'Not found', error);

    this.name = 'Not Found Error';
    this.code = ErrorCodes.notFoundError;
    this.level = level || ErrorLevel.error;
  }
}
