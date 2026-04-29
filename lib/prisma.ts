/*
 * Prisma client is loaded lazily to avoid hard build failures in environments
 * where optional install steps are skipped.
 */

type PrismaModule = {
  PrismaClient: new () => unknown;
};

const globalForPrisma = globalThis as { prisma?: unknown };

function createPrismaClient() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaModule = require("@prisma/client") as PrismaModule;
  return new prismaModule.PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
