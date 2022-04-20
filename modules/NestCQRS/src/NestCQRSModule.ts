import { DynamicModule, Global, Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';

export interface NestAwsCqrsOptions {
  distributedTracing: string; // DistributedTracingConfig;
}

@Global()
@Module({
  imports: [CqrsModule],
  providers: [CommandBus, QueryBus, ExplorerService],
  exports: [CommandBus, QueryBus]
})
export class NestCQRSModule extends CqrsModule {
  constructor(explorerService: ExplorerService, eventsBus: EventBus, commandsBus: CommandBus, queryBus: QueryBus) {
    super(explorerService, eventsBus, commandsBus, queryBus);
  }

  static forRoot(options: NestAwsCqrsOptions): DynamicModule {
    return {
      module: NestCQRSModule
      //   providers: [
      //     {
      //       provide: 'DISTRIBUTED_TRACING_CONFIG',
      //       useValue: options.distributedTracing,
      //     },
      //   ],
    };
  }
}
