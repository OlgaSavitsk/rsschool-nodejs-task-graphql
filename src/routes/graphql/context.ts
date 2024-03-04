import { PrismaClient } from "@prisma/client"

export type ContextQL = {
    prisma: PrismaClient
}