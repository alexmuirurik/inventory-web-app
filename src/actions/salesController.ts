'use server'
import prisma from '@/prisma/prisma'
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
