'use server'
import prisma from "@/prisma/prisma"
import { brandSchema } from "@/prisma/schema"
import { z } from "zod"

export const getBrand = async (businessId: string, name: string) => {
    try {
        const brand = await prisma.brand.findFirst({
            where: {
                name: name,
                businessId: businessId
            }
        })
        return brand
    } catch (error) {
        console.log('We faced an error getting a brand ' + error)
    }
}

export const getManyBrands = async (businessId: string) => {
    try {
        const categories = await prisma.brand.findMany({
            where: { businessId: businessId }
        })
        return categories
    } catch (error) {
        console.log('We Faced an Error getting many Categories ' + error)
    }
}

export const createBrand = async (data: z.infer<typeof brandSchema>) => {
    try {
        const brand = await getBrand(data.businessId, data.name)
        if(brand) return brand
        const createdbrand = await prisma.brand.create({ data })
        return createdbrand
    } catch (error) {
        console.log('We faced an error creating a brand ' + error)
    }
}