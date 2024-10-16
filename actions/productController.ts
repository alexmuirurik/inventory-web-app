'use server'
import { createSKU, stringToJSON } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { productSchema, stockSchema, updateProductSChema } from "@/prisma/schema"
import { z } from "zod"
import { findActiveSale } from "./salesController"

export const getProductById = async (productId: string) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: productId } })
        return product
    } catch (error) {
        console.log('Getting Product By Id Error: ' + error)
    }
}

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
                checkoutitems: true,
                brand: true,
                productInStock: true
            }
        })
        return products
    } catch (error) {
        console.log('We faced an error getting many products ' + error)
    }
}

export const getProductsinCart = async (businessLocationId: string) => {
    try {
        const sale = await findActiveSale(businessLocationId)
        const checkoutitems = await prisma.checkoutItem.findMany({ 
            where: { saleId: sale?.id },
            include: {
                product: true
            } 
        })
        return checkoutitems
    } catch (error) {
        console.log('Products in Cart Error ' + error)
    }
}

export const getProductInStock = async (businessLocationId: string, productId: string) => {
    try {
        const product = await prisma.productInStock.findFirst({where: {
            businessLocationId: businessLocationId,
            productId: productId
        }})
        return product
    } catch (error) {
        console.log('Product in Location ' + error)
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
        console.log('Product in Location ' + error)
    }
}

export const updateProduct = async (data: z.infer<typeof updateProductSChema>) => {
    try {
        const product = await prisma.product.update({
            where: {id: data.productId},
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                buyingPrice: Number(data.buyingPrice),
                sellingPrice: Number(data.sellingPrice),
                variants: stringToJSON(data.variants as string), 
                tags: stringToJSON(data.tags as string)
            }
        })
        return product
    } catch (error) {
        console.log('Update Product Error: ' + error)
    }
}

export const createProduct = async (data: z.infer<typeof productSchema>) => {
    try {
        const product = await getProduct(data.businessId, data.name)
        if(product) return product
        const createdproduct = await prisma.product.create({ data: {
            ...data,
            image: data.image ?? '/uploads/1.jpg',
            tags: stringToJSON(data.tags as string), 
            sku: createSKU(data.name)
        }})
        return createdproduct
    } catch (error) {
        console.log('We faced an error creating a product ' + error)
    }
}


export const updateProductStock = async (businessLocationId: string, productId: string, count: number) => {
    try {
        const productInStock = await getProductInStock(businessLocationId, productId)
        if(!productInStock) return
        const updatedproductinstock = await prisma.productInStock.update({
            where: { id: productInStock.id },
            data: { count: count }
        })
        return updatedproductinstock
    } catch (error) {
        console.log('Update Product Stock Error ' + error)
    }
}

export const createProductInStock = async (data: z.infer<typeof stockSchema>) => {
    try {
        const productInStock = await getProductInStock(data.businessLocationId, data.productId)
        if(productInStock) return prisma.productInStock.update({
            where: { id: productInStock.id },
            data: { 
                sizes: data.sizes,
                discount: Number(data.discount),
                count: Number(data.count) 
            }
        })
        const createdProductInStock = await prisma.productInStock.create({ data : {
            count: Number(data.count),
            sizes: data.sizes,
            discount: Number(data.discount),
            productId: data.productId,
            businessLocationId: data.businessLocationId,
        }})
        if(createdProductInStock) return createdProductInStock
    } catch (error) {
        console.log('Creating Product Stock Error: ' + error)
    }
}