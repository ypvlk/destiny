import { HttpException } from '@nestjs/common';
import { ErrorContext } from '@destiny/shared-interfaces';

export function getErrorContext(error: Error): ErrorContext {
  if (error instanceof HttpException) {
    error = error.getResponse() as Error;
  }

  return {
    message: error?.message || 'Unknown error',
    stack: error?.stack || ''
  };
}
