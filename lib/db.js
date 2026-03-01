import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across 
// Next.js build workers and serverless invocations.
const globalForPrisma = globalThis

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// UNCONDITIONALLY cache the client. 
// A 5-connection limit on filess.io is extremely small.
// During build time (npm run build), Next.js spawns multiple workers.
// Unconditional caching prevents each module load from creating a new client.
globalForPrisma.prisma = prisma
