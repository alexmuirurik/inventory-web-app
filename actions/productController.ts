'use server'
import { createSKU, stringToJSON } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { productSchema, stockSchema } from "@/prisma/schema"
import { z } from "zod"
import { uploadImage } from "./ImageController"

export const getProduct = async (businessId: string, productName: string) => {
    try {
        const product = await prisma.product.findFirst({ where: {
            businessId: businessId, 
            name: productName
        }})
        return product
    } catch (error) {
        return console.log('We faced an error getting a product ' + error)
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
        return console.log('We faced an error getting many products ' + error)
    }
}

export const getProductInStock = async (businessLocationId: string, productId: string) => {
    try {
        const product = await prisma.productInStock.findFirst({where: {
            businessLocationId: businessLocationId,
            productId: productId
        }})
        if(product) return product
    } catch (error) {
        return console.log('Product in Location ' + error)
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
            }
        })
        return products
    } catch (error) {
        return console.log('Product in Location ' + error)
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
        return console.log('We faced an error creating a product ' + error)
    }
}

export const createProductInStock = async (data: z.infer<typeof stockSchema>) => {
    try {
        const productInStock = await getProductInStock(data.businessLocationId, data.productId)
        if(productInStock) return prisma.productInStock.update({
            where: { id: productInStock.id },
            data: {
                count: Number(data.count),
                buyingPrice: Number(data.buyingPrice),
                sellingPrice: Number(data.sellingPrice),
                discount: Number(data.discount),
                colors: stringToJSON(data.colors),
            }
        })
        const createdProductInStock = await prisma.productInStock.create({ data : {
            buyingPrice: Number(data.buyingPrice),
            sellingPrice: Number(data.sellingPrice),
            discount: Number(data.discount),
            colors: stringToJSON(data.colors),
            count: Number(data.count),
            productId: data.productId,
            businessLocationId: data.businessLocationId,
        }})
        if(createdProductInStock) return createdProductInStock
    } catch (error) {
        return console.log('Creating Product Stock Error: ' + error)
    }
}