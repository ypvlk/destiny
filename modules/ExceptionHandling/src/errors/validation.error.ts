import { HttpStatus } from '@nestjs/common';

import { ErrorCodes, ErrorResponse, ErrorOptionsInterface } from '@destiny/shared-interfaces';
import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  constructor({ error, message }: ErrorOptionsInterface) {
    super(HttpStatus.BAD_REQUEST, message || 'Validation error', error);

    this.name = 'Validation Error';
    this.code = ErrorCodes.validationError;
  }

  toResponse(): ErrorResponse {
    return {
      ...super.toResponse(),
      meta: this.context.message
    };
  }
}
