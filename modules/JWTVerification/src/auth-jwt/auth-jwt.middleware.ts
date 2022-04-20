import { Injectable, NestMiddleware, Type, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import logger from '@destiny/logger';
import { UnauthorizedError } from '@destiny/exception-handling';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
  static key: string;

  static forRoot(key: string = 'user'): Type<JWTMiddleware> {
    JWTMiddleware.key = key;
    return JWTMiddleware;
  }

  use(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate(
      'jwt',
      {
        session: false,
        userProperty: 'user'
      },
      (err, user, info, status) => {
        try {
          if (err || !user) {
            throw new UnauthorizedError(err);
          }
          // @ts-ignore
          req[JWTMiddleware.key] = user;

          next();
        } catch (error) {
          logger.error(
            `JWT Authenticate Error - ${error.message}`,
            {},
            {
              method: req.method,
              path: req.path,
              originalUrl: req.originalUrl,
              message: error.message,
              stack: error.stack
            }
          );

          next(error);
        }
      }
    )(req, res, next);
  }
}
