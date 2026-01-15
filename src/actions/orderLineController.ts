

'use server'

import prisma from "@/prisma/prisma"

export const getManyOrderLines = async (businessLocationId: string) => {
    try {
        const orderLines = await prisma.orderLine.findMany({
            where: {
                businessLocationId: businessLocationId,
            },
            include: {
                orderLineItems: {
                    include: {
                        product: {
                            include: {
                                stocks: true   
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
        return Promise.resolve(orderLines)
    } catch (error) {
        console.log('We faced an error getting many order lines ' + error)
    }
}