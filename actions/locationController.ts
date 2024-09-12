'use server'
import prisma from "@/prisma/prisma"
import { businessSchema } from "@/prisma/schema"
import { z } from "zod"

export const getLocation = async (businessId: string, name: string) => {
    try {
        const location = await prisma.businessLocation.findFirst({where: { businessId: businessId, name: name }})
    } catch (error) {
        console.log('We faced an error getting a location ' + error)
    }
}

export const createLocation = async (data: z.infer<typeof businessSchema>, businessId: string) => {
    try {
        const location = getLocation(businessId, data.location)
        if(location) return location
        const createdlocation = await prisma.businessLocation.create({ 
            data: {
                name: data.location, 
                city: data.city,
                country: data.country,
                address: data.address,
                businessId: businessId
            }
        })
        return createdlocation
    } catch (error) {
        console.log('We faced an error creating a location ' + error)
    }
}