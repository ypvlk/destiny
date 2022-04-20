import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorCodes, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class CustomError extends BaseError {
  constructor({ error, message, level }: ErrorOptionsInterface) {
    super(HttpStatus.BAD_REQUEST, message || 'Bad Request', error);

    this.name = 'Bad Request Error';
    this.code = ErrorCodes.badRequestError;
    this.level = level || ErrorLevel.error;
  }
}
