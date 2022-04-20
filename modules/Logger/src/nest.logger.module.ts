import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './nest.logger.middleware';
import { NestLogger } from './nest.logger.service';

@Module({
  providers: [
    NestLogger
  ],
  exports: [NestLogger]
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
