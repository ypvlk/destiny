import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import logger, { NestLogger } from '@destiny/logger';
import { ExceptionFilterMiddleware } from '@destiny/exception-handling';

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new NestLogger()
  });

  app.disable('x-powered-by');
  app.useGlobalFilters(new ExceptionFilterMiddleware());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  const config = app.get('ConfigService');
  const globalPrefix = config.get('globalPrefix');
  const port = config.get('port');

  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: config.get('allowedOrigins')?.split(';')
  });

  function handleExit() {
    try {
      // TODO
      logger.info('');
    } catch (error) {
      logger.error('', error);
    } finally {
      process.exit();
    }
  }

  process.on('SIGINT', () => {
    handleExit();
  });
  process.on('SIGTERM', () => {
    handleExit();
  });

  const server = await app.listen(port, () => {
    logger.info(`Webserver express start listening on port ${port}`);
  });

  server.keepAliveTimeout = 65 * 1000;
}

bootstrap();

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  logger.error('unhandled_rejection', reason, promise);
});
process.on('uncaughtException', (reason: Error) => {
  logger.error('uncaughtException', reason);
});
