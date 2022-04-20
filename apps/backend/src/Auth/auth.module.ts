import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from '@destiny/jwt-verification';

import { AuthCommandFactoryService } from './application/services/auth-command-factory.service';
import { AuthQueryFactoryService } from './application/services/auth-query-factory.service';

import { AuthController } from './auth.comtroller';
import { AuthService } from './auth.service';
import { QueryHandlers } from './application/queries';
import { CommandHandlers } from './application/commands';

import { UsersRepository } from '../Repositories';

@Module({
  controllers: [AuthController],
  imports: [TokenModule, TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthCommandFactoryService, AuthQueryFactoryService, AuthService, ...QueryHandlers, ...CommandHandlers]
})
export class AuthModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {}
}
