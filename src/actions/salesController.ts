'use server'
import prisma from '@/prisma/prisma'
import { salesSchema } from '@/prisma/schema'
import { z } from 'zod'
import { createOrderLine } from './orderLineController'

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

export const createSale = async (data: z.infer<typeof salesSchema>) => {
    try {
        const orderLine = await createOrderLine({
            businessLocationId: data.businessLocationId,
            date: (data.date ?? new Date()).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            }),
        })

        const supplies = orderLine.supplies.reduce(
            (prev, curr) => prev + curr.itemsCount,
            0
        )

        const sales = orderLine.sales.reduce(
            (prev, curr) => prev + curr.itemsCount,
            0
        )

        if (supplies - sales < data.itemsCount) {
            throw new Error("Sales can't exceed supplies")
        }

        const sale = await prisma.sale.create({
            data: {
                productId: data.productId,
                businessLocationId: data.businessLocationId,
                sellingPrice: data.sellingPrice,
                itemsCount: data.itemsCount,
                orderLineId: orderLine.id,
            },
        })
        return Promise.resolve(sale)
    } catch (error) {
        return Promise.reject(error)
    }
}
