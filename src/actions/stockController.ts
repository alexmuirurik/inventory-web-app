'use server'
import prisma from '@/prisma/prisma'
import { stockSchema } from '@/prisma/schema'
import { z } from 'zod'
import { createOrderLine } from './orderLineController'

export const getTodaysStock = async () => {
    try {
        const stock = prisma.supply.findFirst({
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
        const orderLine = await createOrderLine({
            businessLocationId: data.businessLocationId,
            date: new Date().toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            }),
        })

        const createStock = await prisma.supply.create({
            data: {
                ...data,
                orderLineId: orderLine.id,
            },
        })
        return Promise.resolve(createStock)
    } catch (error) {
        return Promise.reject(error)
    }
}
