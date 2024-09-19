import { Prisma } from "@prisma/client"

export type productInStockAndProductAndPurchase = Prisma.ProductInStockGetPayload<{
    include: {
        product: true, 
        purchase: true
    }
}>

export type CheckoutItemsWithProducts = Prisma.PurchaseItemGetPayload<{
    include: {
        product: true
    }
}>

export type ProductWithCategoriesAndBrands = Prisma.ProductGetPayload<{
    include: {
        category: true,
        brand: true
    }
}>