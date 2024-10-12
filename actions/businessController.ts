'use server'
import { auth } from "@/auth"
import prisma from "@/prisma/prisma"
import { businessSchema } from "@/prisma/schema"
import { z } from "zod"
import { createLocation } from "./locationController"
import { createCashier } from "./userController"

export const getBusiness = async (userId: string) => {
    try {
        const business = await prisma.business.findFirst({ where: { ownerId: userId }})
        return business
    } catch (error) {
        console.log('We faced an error getting a business ' + error)
    }
}

export const getBusinessSubscriptionByID = async (subscriptionId: string) => {
    try {
        const subscription = await prisma.subscription.findUnique({ where: { id: subscriptionId }})
        return subscription
    } catch (error) {
        console.log('Getting Business Subscription Error ' + error)
    }
} 

export const createBusiness = async (data: z.infer<typeof businessSchema>) => {
    try {
        const session = await auth()
        const business = await getBusiness(session?.user?.id as string)
        if(business) { 
            prisma.business.update({
                where: { id: business.id },
                data: { 
                    name: data.name,
                    mobile: data.mobile,
                    logo: data.logo
                }
            })
            const location = await createLocation(session?.user?.id as string, data, business.id)
            const cashier = await createCashier({
                email: session?.user.email as string,
                userId: session?.user.id as string,
                businessId: business.id,
                businessLocationId: location?.id as string
            })
            return business
        }else {
            const createdbusiness = await prisma.business.create({
                data: { 
                    name: data.name,
                    mobile: data.mobile,
                    logo: data.logo,
                    ownerId: session?.user?.id as string
                }
            })
            const location = await createLocation(session?.user?.id as string, data, createdbusiness.id)
            const cashier = await createCashier({
                email: session?.user.email as string,
                userId: session?.user.id as string,
                businessId: createdbusiness.id,
                businessLocationId: location?.id as string
            })
            return createdbusiness
        }
    } catch (error) {
        console.log('We faced an error creating a business ' + error)
    }
}

export const createBusinessSubscription = async (amount: number, phone: string, type:string, businessId: string, MerchantRequestID:string, CheckoutRequestID: string) => {
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
                status: 'unpaid'
            }
        })
        return subscription
    } catch (error) {
        console.log('Create Business Subscription Error ' + error )
    }
}