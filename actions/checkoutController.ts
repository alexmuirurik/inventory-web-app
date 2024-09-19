'use server'
import prisma from "@/prisma/prisma"
import { cartSchema } from "@/prisma/schema"
import { z } from "zod"

export const getPendingPurchase = async (businessLocationId: string) => {
    try {
        const purchase = await prisma.purchase.findFirst({
            where: {
                businessLocationId: businessLocationId, 
                status: 'pending'
            }
        })
        return purchase
    } catch (error) {
        console.log('Get purchase error: ' + error)
    }
}

export const getPurchaseItems = async (purchaseId: string) => {
    try {
        const purchaseitems = await prisma.purchaseItem.findMany({
            where: {
                purchaseId: purchaseId
            }, 
            include: {
                product: true
            }
        })
        return purchaseitems
    } catch (error) {
        console.log('Getting Purchase Items error: ' + error)
    }
}

export const getPurchaseItem = async (data: z.infer<typeof cartSchema>, purchaseId: string) => {
    try {
        const purchaseItem = await prisma.purchaseItem.findFirst({
            where: {
                productId: data.productId,
                purchaseId: purchaseId 
            }
        })
        return purchaseItem
    } catch (error) {
        console.log('Creating purchase item error: ' + error)
    }
}


export const createPurchaseItem = async (data: z.infer<typeof cartSchema>, purchaseId: string) => {
    try {
        const purchaseItem = await getPurchaseItem(data, purchaseId)
        if (purchaseItem) return await prisma.purchaseItem.update({
            where: {
                id: purchaseItem.id,
            },
            data: {
                sellingPrice: Number(data.sellingPrice),
                buyingPrice: Number(data.buyingPrice),
                discount: Number(data.discount)
            }
        })

        const createdpurchaseItem = await prisma.purchaseItem.create({
            data: {
                colors: 'sdds',
                count: 1,
                productId: data.productId,
                purchaseId: purchaseId,
                sellingPrice: Number(data.sellingPrice),
                buyingPrice: Number(data.buyingPrice),
                discount: Number(data.discount),
                status: 'available',
            }
        })
        return createdpurchaseItem
    } catch (error) {
        console.log('Creating purchase item error: ' + error)
    }
}

export const createPurchase = async (data: z.infer<typeof cartSchema>) => {
    try {
        const purchase = await getPendingPurchase(data.businessLocationId)
        if(purchase) return createPurchaseItem(data, purchase.id)
        const createdpurchase = await prisma.purchase.create({
            data: {
                supplierId: data.supplierId,
                businessLocationId: data.businessLocationId,
                status: 'pending'
            }
        })
        return await createPurchaseItem(data, createdpurchase.id)
    } catch (error) {
        console.log('creating purchase error ' + error)
    }
}