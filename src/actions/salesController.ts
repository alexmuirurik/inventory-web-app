'use server'
import prisma from '@/prisma/prisma'
import { cartSchema, checkoutSchema } from '@/prisma/schema'
import { z } from 'zod'
import { getProductById } from './productController'

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

export const getManySales = async (productId: string) => {
    try {
        const sales = await prisma.sale.findMany({
            where: {
                productId: productId,
            },
           
        })
        return sales
    } catch (error) {
        console.log('Getting Sales Error: ' + error)
    }
}


export const createSale = async (data: z.infer<typeof cartSchema>) => {
    try {
        const createdsale = await prisma.sale.create({
            data: {
                productId: data.businessLocationId
            },
        })
        return createdsale
    } catch (error) {
        console.log('Creating Sale Error: ' + error)
    }
}