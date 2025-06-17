'use server'
import prisma from '@/prisma/prisma'
import { OrderLine } from '@/prisma/types'

export const getOrderLineByDate = async (date: Date = new Date()) => {
    try {
        const orderLine = await prisma.orderLine.findUnique({
            where: {
                date: date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                }),
            },
        })
        return Promise.resolve(orderLine)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getManyOrderLines = async () => {
    try {
        const orderLines = await prisma.orderLine.findMany({
            include: {
                pettyCash: true,
                sales: true,
                supplies: true,
                businessLocation: true,
            },
        })
        return Promise.resolve(orderLines)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createOrderLine = async (data: OrderLine) => {
    try {
        const orderLine = await getOrderLineByDate(new Date(data.date))
        if (orderLine) {
            return Promise.resolve(orderLine)
        }
        const createOrderLine = await prisma.orderLine.create({ data })
        return Promise.resolve(createOrderLine)
    } catch (error) {
        return Promise.reject(error)
    }
}
