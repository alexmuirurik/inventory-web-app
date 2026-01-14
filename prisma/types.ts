import { Prisma } from '@prisma/client'

export interface OrderLine {
    date: string
    businessLocationId: string
}

export type CompleteLocation = Prisma.BusinessLocationGetPayload<{
    include: {
        products: true,
        stocks: true,
        sales: true,
    }
}>

export type CompleteOrderLine = Prisma.OrderLineGetPayload<{
    include: {
        orderLineItems: {
            include: {
                product: true
            }
        }
    }
}>

export type CompleteSale = Prisma.SaleGetPayload<{
    include: {
        saleItems: {
            include: {
                product: true
            }
        }
    },
}>

export type CompleteProduct = Prisma.ProductGetPayload<{
    include: {
        category: true
        stocks: true
        saleItems: true
    }
}>
