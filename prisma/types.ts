import { Prisma } from "@prisma/client"

export type productInStockAndProductAndPurchase = Prisma.ProductInStockGetPayload<{
    include: {
        product: true, 
    }
}>

export type CheckoutitemswithProducts = Prisma.CheckoutItemGetPayload<{
    include: {
        product: true,
    }
}>

export type ProductWithCategoriesBrandsAndStock = Prisma.ProductGetPayload<{
    include: {
        category?: true,
        checkoutitems?: true,
        brand?: true,
        productInStock?: true
    }
}>

export type SaleWithCheckoutItem = Prisma.SaleGetPayload<{
    include: {
        checkoutitems: true,
        customer: true,
    }
}>