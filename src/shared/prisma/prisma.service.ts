import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { LoggerService } from '../logger';
import { ExtendedPrismaClient } from './extended-prisma-client';

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private logger: LoggerService) {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.info(`PrismaService connected to the database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.info(`PrismaService disconnected from the database`);
  }
}
