'use server'
import prisma from "@/prisma/prisma"
import { cartSchema, checkoutSchema } from "@/prisma/schema"
import { z } from "zod"
import { createRandomCustomer } from "./userController"
import { getProductById } from "./productController"

export const findActiveSale = async (businessLocationId: string) => {
    try {
        const sale = await prisma.sale.findFirst({ where: { status: 'pending' } })
        if(sale) return sale
        const createdsale = createSale({ businessLocationId: businessLocationId })
        return createdsale
    } catch (error) {
        console.log('Find Active Sale Error: ' + error)
    }
}

export const findCustomerSale = async (businessLocationId: string, customerId: string) => {
    try {
        const sale = await prisma.sale.findFirst({ where: { businessLocationId: businessLocationId, customerId: customerId }})
        return sale
    } catch (error) {
        console.log('Finding Sale Error: ' + error)
    }
}

export const getCheckoutItem = async (productId: string, saleId: string) => {
    try {
        const checkoutItem = await prisma.checkoutItem.findFirst({ where: {
            productId: productId,
            saleId: saleId
        }})
        return checkoutItem
    } catch (error) {
        console.log('Getting Checkout Item Error: ' + error)
    }
}

export const createSale = async (data: z.infer<typeof cartSchema>) => {
    try {
        const customer = await createRandomCustomer('random', data.businessLocationId)
        const sale = await findCustomerSale(data.businessLocationId, customer?.id as string)
        if (sale) return sale
        const createdsale = await prisma.sale.create({ data : {
            customerId: customer?.id as string,
            businessLocationId: data.businessLocationId,
            status: 'pending'
        }})
        return createdsale
    } catch (error) {
        console.log('Creating Sale Error: ' + error)
    }
}

export const updateProductinCart = async (checkoutItemId: string, count: number, status: string) => {
    try {
        const updatecheckoutitem = await prisma.checkoutItem.update({ 
            where: { id: checkoutItemId },
            data: { count: count, status: status }
        })
        return updatecheckoutitem
    } catch (error) {
        console.log('Updating CheckoutItem Error: ' + error)
    }
}

export const addProductToCart = async (businessLocationId: string, productId: string, count: number) => {
    try {
        const sale = await findActiveSale(businessLocationId)
        const product = await getProductById(productId)
        if (!product) return
        const checkoutItem = await getCheckoutItem(productId, sale?.id as string)
        if (checkoutItem) return await updateProductinCart(checkoutItem.id, count, 'unpaid') 
        const createdcheckoutItem = await prisma.checkoutItem.create({
            data: {
                count: count,
                productId: productId,
                saleId: sale?.id as string,
                status: 'unpaid'
            }
        })
        return createdcheckoutItem
    } catch (error) {
        console.log('Adding to Cart Error: ' + error)
    }
}