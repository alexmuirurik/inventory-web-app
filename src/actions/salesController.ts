'use server'
import prisma from '@/prisma/prisma'
import { createSalesSchema, salesSchema } from '@/prisma/schema'
import { z } from 'zod'

export const findSale = async (saleId: string) => {
    try {
        const sale = await prisma.sale.findUnique({
            where: {
                id: saleId,
            },
        })
        return sale
    } catch (error) {
        console.log('Error Finding Sale ' + error)
    }
}

export const findFirstSale = async (productId: string) => {
    try {
        const sale = await prisma.sale.findFirst({
            where: {
                saleItems: {
                    some: {
                        productId: productId,
                    },
                },
            },
        })
        return sale
    } catch (error) {
        console.log('Error Finding Sale ' + error)
    }
}

export const getManySales = async (businessLocationId : string) => {
    try {
        const sales = await prisma.sale.findMany({
            where: {
                businessLocationId: businessLocationId,
            },
            include: {
                saleItems: {
                    include: {
                        product: true
                    }
                }
            },
        })
        return sales
    } catch (error) {
        console.log('Getting Sales Error: ' + error)
    }
}

export const getProductSales = async (productId: string) => {
    try {
        const sales = await prisma.sale.findMany({
            where: {
                saleItems: {
                    some: {
                        productId: productId,
                    },
                },
            },
            include: {
                saleItems: {
                    include: {
                        product: true,
                    },
                },
                businessLocation: true,
            },
        })
        return sales
    } catch (error) {
        console.log('Getting Sales Error: ' + error)
    }
}

export const createSale = async (data: z.infer<typeof createSalesSchema>) => {
    try {
        const updateLocation = await prisma.businessLocation.update({
            where: {
                id: data.businessLocationId,
            },
            data: {
                stocks: {
                    update: data.sales.map((sale) => {
                        return {
                            where: {
                                productId_businessLocationId: {
                                    productId: sale.productId,
                                    businessLocationId: data.businessLocationId,
                                },
                            },
                            data: {
                                itemsCount: {
                                    decrement: sale.itemsCount,
                                },
                            },
                        }
                    }),
                },
                sales: {
                    create: {
                        saleItems: {
                            create: data.sales.map((sale) => {
                                return {
                                    productId: sale.productId,
                                    itemsCount: sale.itemsCount,
                                }
                            }),
                        },
                    },
                },
            },
        })

        return updateLocation
    } catch (error) {
        return Promise.reject(error)
    }
}
