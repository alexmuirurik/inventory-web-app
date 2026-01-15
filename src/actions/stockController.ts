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

export const getManyStocks = async (businessLocationId: string) => {
    try {
        const stocks = await prisma.stock.findMany({
            where: {
                businessLocationId: businessLocationId,
            },
            include: {
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
        return stocks
    } catch (error) {
        console.log('Getting Stock Error: ' + error)
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
                                    sellingPrice: stock.sellingPrice,
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
                                sellingPrice: stock.sellingPrice,
                                itemsCount: stock.itemsCount,
                                buyingPrice: 0,
                            },
                            update: {
                                itemsCount: {
                                    increment: stock.itemsCount,
                                },
                                sellingPrice: stock.sellingPrice
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
