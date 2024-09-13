'use server'
import { auth } from "@/auth"
import prisma from "@/prisma/prisma"
import { businessSchema } from "@/prisma/schema"
import { z } from "zod"
import { createLocation } from "./locationController"

export const getBusiness = async (userId: string) => {
    try {
        const business = await prisma.business.findFirst({ where: { ownerId: userId }})
        return business
    } catch (error) {
        console.log('We faced an error getting a business ' + error)
    }
}

export const getBusinesses = () => {

}

export const createBusiness = async (data: z.infer<typeof businessSchema>) => {
    try {
        const session = await auth()
        const business = await getBusiness(session?.user?.id as string)
        if(business) { 
            prisma.business.update({
                where: { id: business.id },
                data: { name: data.name }
            })
            const location = createLocation(session?.user?.id as string, data, business.id)
            return business
        }else {
            const createdbusiness = await prisma.business.create({
                data: { 
                    name: data.name,
                    ownerId: session?.user?.id as string
                }
            })
            const location = createLocation(session?.user?.id as string, data, createdbusiness.id)
            return createdbusiness
        }
    } catch (error) {
        console.log('We faced an error creating a business ' + error)
    }
}