'use server'
import prisma from '@/prisma/prisma'
import { OrderLine } from '@/prisma/types'

export const getOrderLineById = async (orderLineId?: string) => {
    try {
        if (!orderLineId) {
            throw new Error('OrderLineId is Required')
        }
        const orderLine = await prisma.orderLine.findUnique({
            where: {
                id: orderLineId,
            },
            include: {
                orderLineItems: true,
            },
        })
        return orderLine
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getOrderLineByDate = async (
    date: Date = new Date(),
    businessLocationId: string
) => {
    try {
        const orderLine = await prisma.orderLine.findFirst({
            where: {
                businessLocationId: businessLocationId,
                date: date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                }),
            },
            include: {
                orderLineItems: true,
            },
        })
        return Promise.resolve(orderLine)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getManyOrderLines = async (
    businessLocationId: string | undefined
) => {
    try {
        if (!businessLocationId) {
            throw new Error('No Business Location Id')
        }
        const orderLines = await prisma.orderLine.findMany({
            where: {
                businessLocationId: businessLocationId,
            },
            include: {
                orderLineItems: true,
            },
        })
        return Promise.resolve(orderLines)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createOrderLine = async (data: OrderLine) => {
    try {
        const orderLine = await getOrderLineByDate(
            new Date(data.date),
            data.businessLocationId
        )
        if (orderLine) {
            return Promise.resolve(orderLine)
        }
        const createOrderLine = await prisma.orderLine.create({
            data,
            include: {
                orderLineItems: true,
            },
        })
        return Promise.resolve(createOrderLine)
    } catch (error) {
        return Promise.reject(error)
    }
}
