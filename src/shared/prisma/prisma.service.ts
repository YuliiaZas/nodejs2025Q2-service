import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { LoggingService } from '../logger';
import { ExtendedPrismaClient } from './extended-prisma-client';

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private logger: LoggingService) {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });

    this.logger.debug('PrismaService starting...');
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log(`PrismaService connected to the database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log(`PrismaService disconnected from the database`);
  }
}
