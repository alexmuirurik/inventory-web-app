import { PrismaClient } from "@prisma/client"

declare global { namespace NodeJS { interface Global {} } }

interface CustomNodeJsGlobals extends NodeJS.Global {
    prisma: PrismaClient
}

declare const global: CustomNodeJsGlobals

const prisma = global.prisma || new PrismaClient

if (process.env.NODE_ENV === 'development') global.prisma = prisma 

if (typeof prisma === null) prisma === undefined

export default prisma 