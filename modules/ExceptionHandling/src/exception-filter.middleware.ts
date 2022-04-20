import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';

import logger from '@destiny/logger';
import {
  DefaultError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  CustomError,
  InfoError
} from './errors';

@Catch()
export class ExceptionFilterMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error;

    switch (exception.constructor) {
      case InfoError:
        error = new InfoError({ message: exception.message });
        break;
      case CustomError:
        error = new CustomError({ error: exception, message: exception.message });
        break;
      case BadRequestException:
        error = new ValidationError({ error: exception, message: exception.message });
        break;
      case UnauthorizedException:
        error = new UnauthorizedError({ error: exception, message: exception.message });
        break;
      case NotFoundException:
        error = new NotFoundError({ error: exception, message: exception.message });
        break;
      case InternalServerErrorException:
        error = new InternalServerError({ error: exception, message: exception.message });
        break;
      case ForbiddenException:
        error = new ForbiddenError({ error: exception, message: exception.message });
        break;
      default:
        error = new DefaultError(exception);
    }

    logger.error(error.message, error.toLog());

    response.status(error.status).json(error.toResponse());
  }
}
