// https://orkhan.gitbook.io/typeorm/docs/connection-options#postgres--cockroachdb-connection-options
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const pgTypeORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'yarik',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'd_main',
  synchronize: false,
  logging: ['query', 'error'], // ['query', 'error'] : false,
  migrationsRun: false, // true
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
  migrations: [`${__dirname}/../**/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`, `${__dirname}/../**/*.repository{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/Database/postgres/migrations`
  },
  extra: {
    max: process.env.DB_MAX_POOL_SIZE || '3',
    connectionTimeoutMillis: process.env.DB_MAX_CONNECTION_TIMEOUT || '60000',
    idleTimeoutMillis: process.env.DB_MAX_IDLE_TIMEOUT || '30000'
  }
};

// It's for typeorm cli
export default {
  ...pgTypeORMConfig
};
