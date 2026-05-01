import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL || "";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null;
};

function createPrismaClient(): PrismaClient | null {
  if (!connectionString) {
    return null;
  }
  try {
    const adapter = new PrismaPg(connectionString);
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
