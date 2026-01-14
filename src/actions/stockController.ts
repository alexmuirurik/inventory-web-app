'use server'
import prisma from '@/prisma/prisma'
import { createStockSchema, stockSchema } from '@/prisma/schema'
import { z } from 'zod'

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

export const createStock = async (data: z.infer<typeof createStockSchema>) => {
    try {
        const updateLocation = await prisma.businessLocation.update({
            where: {
                id: data.businessLocationId,
            },
            data: {
                orderLine: {
                    create: {
                        orderLineItems: {
                            create: data.stocks.map((stock) => {
                                return {
                                    productId: stock.productId,
                                    itemsCount: stock.itemsCount,
                                    buyingPrice: stock.buyingPrice,
                                }
                            }),
                        },
                    },
                },
                stocks: {
                    upsert: data.stocks.map((stock) => {
                        return {
                            where: {
                                productId_businessLocationId: {
                                    productId: stock.productId,
                                    businessLocationId: data.businessLocationId,
                                }
                            },
                            create: {
                                productId: stock.productId,
                                buyingPrice: stock.buyingPrice,
                                itemsCount: stock.itemsCount,
                                sellingPrice: 0,
                            },
                            update: {
                                itemsCount: {
                                    increment: stock.itemsCount,
                                },
                                buyingPrice: stock.buyingPrice
                            }
                        }
                    }),
                },
            },
        })
        return Promise.resolve(updateLocation)
    } catch (error) {
        return Promise.reject(error)
    }
}
