import { Prisma } from '@prisma/client';

export const timestampExtention = Prisma.defineExtension((prisma) => {
  return prisma.$extends({
    query: {
      user: {
        async create({ args, query }) {
          const timestamp = BigInt(Date.now());
          args.data = {
            ...args.data,
            createdAt: timestamp,
            updatedAt: timestamp,
          };
          return query(args);
        },
        async update({ args, query }) {
          args.data = {
            ...args.data,
            updatedAt: BigInt(Date.now()),
          };
          return query(args);
        },
      },
    },
  });
});
