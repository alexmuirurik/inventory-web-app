'use server'
import { pettySchema } from '@/prisma/schema'
import { z } from 'zod'
import { createOrderLine } from './orderLineController'
import prisma from '@/prisma/prisma'

export const createPettyCash = async (data: z.infer<typeof pettySchema>) => {
    try {
        const orderLine = await createOrderLine({
            businessLocationId: data.businessLocationId,
            date: new Date().toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            }),
        })

        const pettyCash = await prisma.pettyCash.create({
            data: {
                ...data,
                orderLineId: orderLine.id,
            },
        })
        return Promise.resolve(pettyCash)
    } catch (error) {
        return Promise.reject(error)
    }
}
