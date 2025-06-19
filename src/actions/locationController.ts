'use server'
import prisma from '@/prisma/prisma'
import { businessSchema } from '@/prisma/schema'
import { z } from 'zod'

export const getLocationById = async (locationId: string) => {
    try {
        const location = await prisma.businessLocation.findFirst({
            where: {
                id: locationId,
            },
            include: {
                sales: true,
                supplies: true,
                pettyCash: true,
                products: true,
            },
        })
        return Promise.resolve(location)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getLocation = async (businessId: string, name: string) => {
    try {
        const location = await prisma.businessLocation.findFirst({
            where: {
                businessId: businessId,
                name: name,
            },
            include: {
                sales: true,
                supplies: true,
                pettyCash: true,
                products: true,
            },
        })
        return Promise.resolve(location)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getManyLocations = async (businessId: string) => {
    try {
        const locations = await prisma.businessLocation.findMany({
            where: { businessId: businessId },
        })
        return locations
    } catch (error) {
        console.log('We faced an error getting many locations ' + error)
    }
}

export const setActiveLocation = async (
    userId: string,
    businessId: string,
    locationId: string,
    name: string
) => {
    try {
        const location = await getLocation(businessId, name)
        if (!location) return
        const setactive = await prisma.user.update({
            where: { id: userId },
            data: { activeLocation: locationId },
        })
        return location
    } catch (error) {
        console.log(
            'We have faced an error setting location as active ' + error
        )
    }
}

export const createLocation = async (
    userId: string,
    data: z.infer<typeof businessSchema>,
    businessId: string
) => {
    try {
        const location = await getLocation(businessId, data.location)
        if (location)
            return await setActiveLocation(
                userId,
                businessId,
                location.id,
                location.name
            )
        const createdlocation = await prisma.businessLocation.create({
            data: {
                name: data.location,
                city: data.city,
                country: data.country,
                address: data.address,
                businessId: businessId,
            },
        })
        const setactivelocation = await setActiveLocation(
            userId,
            businessId,
            createdlocation.id,
            createdlocation.name
        )
        return setactivelocation
    } catch (error) {
        console.log('We faced an error creating a location ' + error)
    }
}
