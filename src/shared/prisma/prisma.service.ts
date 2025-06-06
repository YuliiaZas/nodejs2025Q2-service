import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { log } from '../logger';
import { ExtendedPrismaClient } from './extended-prisma-client';

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    log(`PrismaService connected to the database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    log(`PrismaService disconnected from the database`);
  }
}
