import { HttpStatus } from '@nestjs/common';

import { ErrorCodes, ErrorLevel } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class DefaultError extends BaseError {
  constructor(error: BaseError) {
    const { status, message, name, code, level, context } = error;
    super(status || HttpStatus.INTERNAL_SERVER_ERROR, message || 'Internal error');

    this.name = name || 'Internal Error';
    this.code = code || ErrorCodes.internalError;
    this.level = level || ErrorLevel.error;
    this.context = context;
  }
}
