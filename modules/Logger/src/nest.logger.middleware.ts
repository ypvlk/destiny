import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logRequest } from './request.logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    logRequest(req, res);
    next();
  }
}
