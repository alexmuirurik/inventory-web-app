import { Prisma } from '@prisma/client'

export interface OrderLine {
    date: string
    businessLocationId: string
}

export type DaySaleSupplyAndPettyCash = Prisma.OrderLineGetPayload<{
    include: {
        pettyCash: true
        sales: true
        supplies: true
        businessLocation: true
    }
}>

export type CompleteProduct = Prisma.ProductGetPayload<{
    include: {
        category?: true
        sales?: true
        supplies?: true
        businessLocation?: true
    }
}>
