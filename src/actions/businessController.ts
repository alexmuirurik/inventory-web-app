'use server'
import prisma from '@/prisma/prisma'
import { businessSchema } from '@/prisma/schema'
import { z } from 'zod'
import { createLocation } from './locationController'

export const getBusiness = async (userId: string | undefined) => {
    try {
        const business = await prisma.business.findFirst({
            where: {
                ownerId: userId,
            },
            include: {
                locations: true,
            },
        })
        return Promise.resolve(business)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getBusinessSubscriptionByID = async (
    subscriptionId: string | undefined
) => {
    try {
        if (!subscriptionId) {
            throw new Error('No Subscription Id')
        }
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
        })
        return subscription
    } catch (error) {
        console.log('Getting Business Subscription Error ' + error)
    }
}

export const createBusiness = async (data: z.infer<typeof businessSchema>) => {
    try {
        const business = await getBusiness(data.ownerId)
        if (business) {
            prisma.business.update({
                where: { id: business.id },
                data: {
                    name: data.name,
                    mobile: data.mobile,
                },
            })
            const location = await createLocation(
                data.ownerId,
                data,
                business.id
            )
            return Promise.resolve(business)
        } else {
            const createdbusiness = await prisma.business.create({
                data: {
                    name: data.name,
                    mobile: data.mobile,
                    ownerId: data.ownerId,
                },
            })
            const location = await createLocation(
                data.ownerId,
                data,
                createdbusiness.id
            )
            return Promise.resolve(createdbusiness)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createBusinessSubscription = async (
    amount: number,
    phone: string,
    type: string,
    businessId: string,
    MerchantRequestID: string,
    CheckoutRequestID: string
) => {
    try {
        const date = new Date()
        const subscription = await prisma.subscription.create({
            data: {
                amount: amount,
                mobile: phone,
                type: type,
                MerchantRequestID: MerchantRequestID,
                CheckoutRequestID: CheckoutRequestID,
                businessId: businessId,
                month: date.getMonth().toString(),
                year: date.getFullYear().toString(),
                status: 'unpaid',
            },
        })
        return Promise.resolve(subscription)
    } catch (error) {
        return Promise.reject(error)
    }
}
