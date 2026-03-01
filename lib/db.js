import { PrismaClient } from '@prisma/client'

// Use a global variable to persist the Prisma Client instance across 
// Next.js build workers and serverless invocations.
const globalForPrisma = globalThis

const enforceConnectionLimit = () => {
  let url = process.env.DATABASE_URL
  if (!url) return url
  if (url.includes('connection_limit=')) {
    url = url.replace(/connection_limit=\d+/, 'connection_limit=1')
  } else {
    url += url.includes('?') ? '&connection_limit=1' : '?connection_limit=1'
  }
  return url
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: { url: enforceConnectionLimit() }
  }
})

// UNCONDITIONALLY cache the client. 
// A 5-connection limit on filess.io is extremely small.
globalForPrisma.prisma = prisma
