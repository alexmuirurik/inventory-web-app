'use server'
import prisma from '@/prisma/prisma'
import { salesSchema } from '@/prisma/schema'
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
                productId: productId,
            },
        })
        return sale
    } catch (error) {
        console.log('Error Finding Sale ' + error)
    }
}

export const getManySales = async (productId: string) => {
    try {
        const sales = await prisma.sale.findMany({
            where: {
                productId: productId,
            },
            include: {
                product: true,
                businessLocation: true,
            },
        })
        return sales
    } catch (error) {
        console.log('Getting Sales Error: ' + error)
    }
}

export const createSale = async (data: z.infer<typeof salesSchema>) => {
    try {
        const sale = await prisma.sale.create({
            data: {
                productId: data.productId,
                businessLocationId: data.businessLocationId,
                sellingPrice: data.sellingPrice,
                itemsCount: data.itemsCount,
            },
        })

        return sale
    } catch (error) {
        return Promise.reject(error)
    }
}
