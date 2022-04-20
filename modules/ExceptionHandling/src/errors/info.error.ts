import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorCodes, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class InfoError extends BaseError {
  constructor({ message }: ErrorOptionsInterface) {
    super(HttpStatus.BAD_REQUEST, message || 'Bad Request');

    this.name = 'Bad Request';
    this.code = ErrorCodes.infoMessage;
    this.level = ErrorLevel.info;
  }
}
