export enum ErrorLevel {
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export class BaseError extends Error {
  public code: string = 'Internal Error';
  public status: number = 402;
  public level: ErrorLevel = ErrorLevel.error;

  constructor(public message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class TokenError extends BaseError {
  constructor(public message: string) {
    super(message);
    super.name = 'Token Error';
  }
}

export class TokenDecodeError extends BaseError {
  constructor(public message: string) {
    super(message);
    super.name = 'Token Decode Error';
  }
}

export class TokenVerifyError extends BaseError {
  constructor(public message: string) {
    super(message);
    super.name = 'Token Verify Error';
  }
}
