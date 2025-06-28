'use server'
import prisma from '@/prisma/prisma'
import { productSchema } from '@/prisma/schema'
import { z } from 'zod'

export const getProductById = async (productId: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        })
        return product
    } catch (error) {
        console.log('Getting Product By Id Error: ' + error)
    }
}

export const getProduct = async (
    businessLocationId: string,
    productName: string
) => {
    try {
        if (!businessLocationId) {
            throw new Error('No Business Location Id')
        }
        const product = await prisma.product.findFirst({
            where: {
                businessLocationId: businessLocationId,
                name: productName,
            },
        })
        return product
    } catch (error) {
        console.log('We faced an error getting a product ' + error)
    }
}

export const getManyProducts = async (businessLocationId?: string) => {
    try {
        if (!businessLocationId) {
            throw new Error('No Business Location Id')
        }
        const products = await prisma.product.findMany({
            where: {
                businessLocationId: businessLocationId,
            },
            include: {
                category: true,
                supplies: true,
                sales: true,
                businessLocation: true,
            },
        })
        return products
    } catch (error) {
        console.log('We faced an error getting many products ' + error)
    }
}

export const updateProduct = async (data: z.infer<typeof productSchema>) => {
    try {
        const product = await getProduct(data.businessLocationId, data.name)
        const updateProduct = await prisma.product.update({
            where: { id: product?.id },
            data: {
                name: data.name,
            },
        })
        return updateProduct
    } catch (error) {
        console.log('Update Product Error: ' + error)
    }
}

export const createProduct = async (data: z.infer<typeof productSchema>) => {
    try {
        const product = await getProduct(data.businessLocationId, data.name)
        if (product) return product
        const createdproduct = await prisma.product.create({ data })
        return createdproduct
    } catch (error) {
        console.log('We faced an error creating a product ' + error)
    }
}
