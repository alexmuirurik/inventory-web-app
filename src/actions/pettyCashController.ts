'use server'
import { pettySchema } from '@/prisma/schema'
import { z } from 'zod'
import { createOrderLine } from './orderLineController'
import prisma from '@/prisma/prisma'

export const createPettyCash = async (data: z.infer<typeof pettySchema>) => {
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

        if (supplies - sales < data.losses) {
            throw new Error("Loses can't exceed supplies")
        }

        const pettyCash = await prisma.pettyCash.create({
            data: {
                businessLocationId: data.businessLocationId,
                pettyCash: data.pettyCash,
                miscellaneous: data.miscellaneous,
                losses: data.losses,
                orderLineId: orderLine.id,
            },
        })
        return Promise.resolve(pettyCash)
    } catch (error) {
        return Promise.reject(error)
    }
}
