// genrate an instance of PrismaClient and export it
// it helps us to create a type safe database client
// that we can use in our application to interact with the database
// This is a singleton pattern to ensure that we only have one instance of PrismaClient
// in our application, which is important for performance and resource management
import { PrismaClient } from "../app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;