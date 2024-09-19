'use server'
import { createSKU } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { productSchema } from "@/prisma/schema"
import { z } from "zod"
import { uploadImage } from "./ImageController"
import { Prisma } from "@prisma/client"

export const getProduct = async (businessId: string, productName: string) => {
    try {
        const product = await prisma.product.findFirst({ where: {
            businessId: businessId, 
            name: productName
        }})
        return product
    } catch (error) {
        console.log('We faced an error getting a product ' + error)
    }
}

export const getManyProducts = async (businessId: string) => {
    try {
        const products = await prisma.product.findMany({ 
            where: {
                businessId: businessId
            },
            include: {
                category: true,
                brand: true
            }
        })
        return products
    } catch (error) {
        console.log('We faced an error getting many products ' + error)
    }
}

export const getProductsInStock = async (businessLocationId: string) => {
    try {
        const products = await prisma.productInStock.findMany({ 
            where: {
                businessLocationId: businessLocationId
            },
            include: {
                product: true,
                purchase: true
            }
        })
        return products
    } catch (error) {
        console.log('Product in Location ' + error)
    }
}

export const createProduct = async (data: z.infer<typeof productSchema>) => {
    try {
        console.log(data.image)
        const product = await getProduct(data.businessId, data.name)
        if(product) return product
        const uploadimage = (data.image) ? await uploadImage(data.image) : '/assets/img/Ellipse.png'
        const createdproduct = await prisma.product.create({ data: {
            ...data,
            image: uploadimage,
            sku: createSKU(data.name, data.businessId, data.brandId)
        }})
        return createdproduct
    } catch (error) {
        console.log('We faced an error creating a product ' + error)
    }
}
