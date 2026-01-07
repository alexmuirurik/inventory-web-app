'use server'
import prisma from '@/prisma/prisma'
import { stockSchema } from '@/prisma/schema'
import { z } from 'zod'
import { createOrderLine } from './orderLineController'

export const getTodaysStock = async () => {
    try {
        const stock = prisma.stock.findMany({
            where: {
                createdAt: {
                    gte: new Date(),
                },
            },
        })
        return Promise.resolve(stock)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createStock = async (data: z.infer<typeof stockSchema>) => {
    try {
        const createStock = await prisma.stock.create({
            data: {
                productId: data.productId,
                businessLocationId: data.businessLocationId,
                buyingPrice: data.buyingPrice,
                itemsCount: data.itemsCount,
            },
        })
        return Promise.resolve(createStock)
    } catch (error) {
        return Promise.reject(error)
    }
}
