import { LoggerService, Injectable } from '@nestjs/common';
import { logger } from './logger.service';

/**
 * NestJS specific implementation to support NestJS api, should be used to log system messages from Nest.
 * Not recommended way to log business valuable messages.
 */
@Injectable()
export class NestLogger implements LoggerService {
  log(message: any, context?: string) {
    logger.info(message);
  }
  error(message: any, trace?: string, context?: string) {
    logger.error(message, trace, context);
  }
  warn(message: any, context?: string) {
    logger.warn(message, {}, context);
  }
  debug?(message: any, context?: string) {
    logger.debug(message, {}, context);
  }
  verbose?(message: any, context?: string) {
    logger.debug(message, {}, context);
  }

}
