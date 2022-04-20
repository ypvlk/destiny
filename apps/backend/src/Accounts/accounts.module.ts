import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { TokenModule } from '@destiny/jwt-verification';
import { RolesService, RolesGuard } from '@destiny/permissions-roles';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsQueryFactoryService } from './application/services/accounts-query-factory.service';
import { AccountsCommandFactoryService } from './application/services/accounts-command-factory.service';

import { UsersRepository } from '../Repositories';
import { QueryHandlers } from './application/queries';
import { CommandHandlers } from './application/commands';

@Module({
  controllers: [AccountsController],
  imports: [TokenModule, TypeOrmModule.forFeature([UsersRepository])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AccountsQueryFactoryService,
    AccountsCommandFactoryService,
    AccountsService,
    RolesService,
    ...QueryHandlers,
    ...CommandHandlers
  ]
})
export class AccountsModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {}
}
