'use server'
import prisma from '@/prisma/prisma'
import { categorySchema } from '@/prisma/schema'
import { z } from 'zod'

export const getCategory = async (businessLocationId: string, name: string) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                name: name,
                businessLocationId: businessLocationId,
            },
        })
        return category
    } catch (error) {
        console.log('We faced an error getting a category ' + error)
    }
}

export const getManyCategories = async (businessLocationId: string) => {
    try {
        const categories = await prisma.category.findMany({
            where: { 
                businessLocationId: businessLocationId 
            },
            orderBy: {
                createdAt: 'desc',
            }
        })
        return categories
    } catch (error) {
        console.log('We Faced an Error getting many Categories ' + error)
    }
}

export const createCategory = async (data: z.infer<typeof categorySchema>) => {
    try {
        const category = await getCategory(data.businessLocationId, data.name)
        if (category) return category
        const createdcategory = await prisma.category.create({ data })
        return createdcategory
    } catch (error) {
        console.log('We faced an error creating a category ' + error)
    }
}
