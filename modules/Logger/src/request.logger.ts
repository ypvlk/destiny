import { Request, Response } from 'express';
import { omit } from 'lodash';
import { logger } from './logger.service';

const logRequest = (req: Request, res: Response) => {
  const requestLogger = logger.child('incoming-http-request');
  const requestInfo = {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl,
    requestBody: omit(req.body, 'password')
  };

  requestLogger.info('Request info data', {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl
  });
  requestLogger.debug('Request debug data', requestInfo);

  res.on('finish', () => {
    const responseLogger = logger.child('outgoing-http-response');
    const responseInfo = {
      statusCode: res.statusCode,
      responseBody: omit(res.locals, ['request', 'token'])
    };

    responseLogger.info('Response info data', {
      statusCode: res.statusCode
    });
    responseLogger.debug('Response debug data', responseInfo);
  });
};

export { logRequest };
