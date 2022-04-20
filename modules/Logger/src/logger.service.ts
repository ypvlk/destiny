import bunyan from './bunyan.service';

interface LogProviderInterface {
  fields: any;
  info(arg0: { args: any; context: any }, message: string): void;
  error(arg0: { args: any; context: any }, message: string): void;
  debug(arg0: { args: any; context: any }, message: string): void;
  warn(arg0: { args: any; context: any }, message: string): void;
  fatal(arg0: { args: any; context: any }, message: string): void;
  child(arg0: { component: string }): LogProviderInterface;
}

export interface LoggerServiceInterface {
  info(message: string, args?: any, context?: any): void;
  error(message: string, args?: any, context?: any): void;
  debug(message: string, args?: any, context?: any): void;
  warn(message: string, args?: any, context?: any): void;
  fatal(message: string, args?: any, context?: any): void;
  child(childName: string): LoggerServiceInterface;
}

export class Logger implements LoggerServiceInterface {
  constructor(private _logger: LogProviderInterface) {}

  info(message: string, args?: any, context?: any): void {
    this._logger.info({ args, context }, message);
  }

  error(message: string, args?: any, context?: any): void {

    if (args && args instanceof Error) {
      this._logger.error({ args, context }, `${message}: ${args.toString()}`);
      this._logger.debug({ args, context: { stack: args.stack } }, `DEBUG: ${message}`);
    } else {
      this._logger.error({ args, context }, message);
    }
  }

  debug(message: string, args?: any, context?: any): void {
    this._logger.debug({ args, context }, message);
  }

  warn(message: string, args?: any, context?: any): void {
    this._logger.warn({ args, context }, message);
  }

  fatal(message: string, args?: any, context?: any): void {
    this._logger.fatal({ args, context }, message);
  }

  child(childName: string): LoggerServiceInterface {
    const childProvider = this._logger.child({ component: childName });
    return new Logger(childProvider);
  }
}

export const logger = new Logger(bunyan);
