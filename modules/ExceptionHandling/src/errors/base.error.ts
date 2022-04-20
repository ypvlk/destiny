import { HttpStatus } from '@nestjs/common';

import { ErrorLevel, ErrorResponse, ErrorLog, ErrorContext, ErrorCodes } from '@destiny/shared-interfaces';
import { getErrorContext } from '../error.context';

export class BaseError extends Error {
  public code: ErrorCodes;
  public status: HttpStatus;
  public level: ErrorLevel;
  public context: ErrorContext;

  constructor(status: number, message: string, error?: Error) {
    super(message);

    this.status = status;
    this.context = getErrorContext(error);
  }

  public toLog(): ErrorLog {
    return { ...this.toResponse(), context: this.context };
  }

  public toResponse(): ErrorResponse {
    return {
      code: this.code || ErrorCodes.internalError,
      name: this.name,
      message: this.message,
      status: this.status || HttpStatus.INTERNAL_SERVER_ERROR,
      level: this.level || ErrorLevel.info
    };
  }
}
