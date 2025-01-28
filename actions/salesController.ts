'use server'
import prisma from '@/prisma/prisma'
import { cartSchema, checkoutSchema } from '@/prisma/schema'
import { z } from 'zod'
import { createRandomCustomer } from './userController'
import {
    getProductById,
    getProductInStock,
    updateProductStock,
} from './productController'
import { CheckoutitemswithProducts } from '@/prisma/types'

export const findActiveSale = async (businessLocationId: string) => {
    try {
        const sale = await prisma.sale.findFirst({
            where: { status: 'pending' },
        })
        if (sale) return sale
        const createdsale = createSale({
            businessLocationId: businessLocationId,
        })
        return createdsale
    } catch (error) {
        console.log('Find Active Sale Error: ' + error)
    }
}

export const findCustomerSale = async (
    status: string,
    businessLocationId: string,
    customerId: string
) => {
    try {
        const sale = await prisma.sale.findFirst({
            where: {
                status: status,
                businessLocationId: businessLocationId,
                customerId: customerId,
            },
        })
        return sale
    } catch (error) {
        console.log('Finding Sale Error: ' + error)
    }
}

export const getManySales = async (businessLocationId: string) => {
    try {
        const sales = await prisma.sale.findMany({
            where: {
                businessLocationId: businessLocationId,
                status: 'completed',
            },
            include: {
                checkoutitems: true,
                customer: true,
            },
        })
        return sales
    } catch (error) {
        console.log('Getting Sales Error: ' + error)
    }
}

export const getCheckoutItem = async (productId: string, saleId: string) => {
    try {
        const checkoutItem = await prisma.checkoutItem.findFirst({
            where: {
                productId: productId,
                saleId: saleId,
            },
        })
        return checkoutItem
    } catch (error) {
        console.log('Getting Checkout Item Error: ' + error)
    }
}

export const createSale = async (data: z.infer<typeof cartSchema>) => {
    try {
        const customer = await createRandomCustomer(
            'random',
            data.businessLocationId
        )
        const sale = await findCustomerSale(
            'pending',
            data.businessLocationId,
            customer?.id as string
        )
        if (sale) return sale
        const createdsale = await prisma.sale.create({
            data: {
                customerId: customer?.id as string,
                businessLocationId: data.businessLocationId,
                status: 'pending',
            },
        })
        return createdsale
    } catch (error) {
        console.log('Creating Sale Error: ' + error)
    }
}

export const updateProductinCart = async (
    checkoutItemId: string,
    count: number,
    status: string
) => {
    try {
        const updatecheckoutitem = await prisma.checkoutItem.update({
            where: { id: checkoutItemId },
            data: {
                count: count,
                status: status,
            },
        })
        return updatecheckoutitem
    } catch (error) {
        console.log('Updating CheckoutItem Error: ' + error)
    }
}

export const addProductToCart = async (
    businessLocationId: string,
    productId: string,
    count: number
) => {
    try {
        const sale = await findActiveSale(businessLocationId)
        const product = await getProductById(productId)
        if (!product) return
        const checkoutItem = await getCheckoutItem(
            productId,
            sale?.id as string
        )
        if (checkoutItem)
            return await updateProductinCart(checkoutItem.id, count, 'unpaid')
        const createdcheckoutItem = await prisma.checkoutItem.create({
            data: {
                count: count,
                buyingPrice: Number(product.buyingPrice),
                sellingPrice: Number(product.sellingPrice),
                productId: productId,
                saleId: sale?.id as string,
                status: 'unpaid',
            },
        })
        return createdcheckoutItem
    } catch (error) {
        console.log('Adding to Cart Error: ' + error)
    }
}

export const completeSale = async (
    businessLocationId: string,
    checkoutitems: CheckoutitemswithProducts[],
    amount: number,
    paid: number,
    customerId?: string
) => {
    try {
        const sale = !customerId
            ? await findActiveSale(businessLocationId)
            : await findCustomerSale('pending', businessLocationId, customerId)

        if (!sale) return

        const updatecheckoutitem = await prisma.checkoutItem.updateMany({
            where: { saleId: sale.id },
            data: { status: 'paid' },
        })

        console.log(updatecheckoutitem)
        const updateproductsinstock = checkoutitems.forEach(async (item) => {
            const productInStock = await getProductInStock(
                businessLocationId,
                item.productId
            )
            if (productInStock) {
                const totalcount = productInStock.count - item.count
                await updateProductStock(
                    businessLocationId,
                    item.productId,
                    totalcount
                )
            }
        })
        console.log(updateproductsinstock)

        const updatedsale = await prisma.sale.update({
            where: { id: sale?.id },
            data: {
                amount: amount,
                paid: amount - paid,
                status: amount - paid <= 0 ? 'completed' : 'incomplete',
            },
        })

        return updatedsale
    } catch (error) {
        console.log('Complete Sale Error ' + error)
    }
}

export const removeProductFromCart = async (checkoutItemId: string) => {
    try {
        const removedproduct = await prisma.checkoutItem.delete({
            where: { id: checkoutItemId },
        })
        return removedproduct
    } catch (error) {
        console.log('Product Remove Error ' + error)
    }
}
