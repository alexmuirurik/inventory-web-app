'use server'
import { createSKU, stringToJSON } from '@/src/lib/utils'
import prisma from '@/prisma/prisma'
import {
    productSchema,
    stockSchema,
    updateProductSChema,
} from '@/prisma/schema'
import { z } from 'zod'
import { findActiveSale } from './salesController'

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

export const getProduct = async (businessId: string, productName: string) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                businessId: businessId,
                name: productName,
            },
        })
        return product
    } catch (error) {
        console.log('We faced an error getting a product ' + error)
    }
}

export const getManyProducts = async (businessId: string) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                businessId: businessId,
            },
            include: {
                category: true,
            },
        })
        return products
    } catch (error) {
        console.log('We faced an error getting many products ' + error)
    }
}


export const updateProduct = async (
    data: z.infer<typeof updateProductSChema>
) => {
    try {
        const product = await prisma.product.update({
            where: { id: data.productId },
            data: {
                name: data.name,
                description: data.description,
            },
        })
        return product
    } catch (error) {
        console.log('Update Product Error: ' + error)
    }
}

export const createProduct = async (data: z.infer<typeof productSchema>) => {
    try {
        const product = await getProduct(data.businessId, data.name)
        if (product) return product
        const createdproduct = await prisma.product.create({
            data: {
                ...data,
    
            },
        })
        return createdproduct
    } catch (error) {
        console.log('We faced an error creating a product ' + error)
    }
}