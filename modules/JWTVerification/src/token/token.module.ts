import { Module } from '@nestjs/common';
import { TokenHandlerService } from './token-handler.service';

@Module({
  providers: [TokenHandlerService],
  exports: [TokenHandlerService]
})
export class TokenModule {}
