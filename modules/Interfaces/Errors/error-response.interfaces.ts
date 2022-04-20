import { HttpStatus } from '@nestjs/common';
import { ErrorLevel, ErrorCodes } from './error-option.interfaces';

export interface ErrorOptionsInterface {
  error?: Error;
  message?: string;
  level?: ErrorLevel;
}

export interface ErrorResponse {
  code: ErrorCodes;
  message: string;
  name: string;
  status: HttpStatus;
  level: ErrorLevel;
  meta?: string | [];
}

export interface ErrorContext {
  message: string | [];
  stack?: string;
}

export interface ErrorLog extends ErrorResponse {
  context: ErrorContext;
}
