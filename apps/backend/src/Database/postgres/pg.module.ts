import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { pgTypeORMConfig } from '../../Config/pg-typeorm-config';

export default TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => pgTypeORMConfig,
  inject: [ConfigService]
});
