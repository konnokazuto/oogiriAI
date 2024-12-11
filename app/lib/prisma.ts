import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare global {
  interface GlobalThis {
    prisma?: PrismaClientSingleton;
  }
}

const prismaGlobal = globalThis.prisma ?? prismaClientSingleton();

export { prismaGlobal as prisma };

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaGlobal;
}
