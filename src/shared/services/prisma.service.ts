import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { log } from '../logger';

@Injectable()
export class PrismaService extends PrismaClient {
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
