import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerModule } from '@destiny/logger';
import { AuthJwtModule } from '@destiny/jwt-verification';
import { NestCQRSModule } from '@destiny/nest-cqrs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { AccountsModule } from './Accounts/accounts.module';

import PostgresModule from './Database/postgres/pg.module';
import configuration from './Config/configuration';

@Module({
  imports: [
    AuthJwtModule.forRoot({ exludeUrls: ['status', 'login', 'register'] }),
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    NestCQRSModule.forRoot({ distributedTracing: '...' }),
    AuthModule,
    AccountsModule,
    LoggerModule,
    PostgresModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
