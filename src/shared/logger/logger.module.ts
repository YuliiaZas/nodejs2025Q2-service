import { Global, Module } from '@nestjs/common';

import { LoggerMiddleware } from './logger.middleware';
import { LoggingService } from './logger.service';

@Global()
@Module({
  providers: [LoggingService, LoggerMiddleware],
  exports: [LoggingService, LoggerMiddleware],
})
export class LoggerModule {}
