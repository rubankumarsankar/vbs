import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across 
// Vercel serverless function invocations and HMR in development.
const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Optional: Log queries during development if needed
    // log: ['query'],
  })

// In development or during Vercel builds, we aggressively cache 
// the client to prevent exhausting the 5-connection DB limit.
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
  globalForPrisma.prisma = prisma
}
