import { Global, Module } from '@nestjs/common';

import { LoggerService } from '../logger';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, LoggerService],
  exports: [PrismaService],
})
export class PrismaModule {}
