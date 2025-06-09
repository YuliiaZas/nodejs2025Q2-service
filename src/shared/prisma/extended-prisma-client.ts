import { Prisma, PrismaClient } from '@prisma/client';

import { timestampExtention } from './timestamp.extention';

function extendPrismaClient(
  prismaClient: PrismaClient,
): PrismaClient & ReturnType<typeof timestampExtention> {
  return prismaClient.$extends(timestampExtention) as PrismaClient &
    ReturnType<typeof timestampExtention>;
}

export class ExtendedPrismaClient extends PrismaClient {
  constructor(options?: Prisma.PrismaClientOptions) {
    super(options);
    return extendPrismaClient(this) as this;
  }
}
