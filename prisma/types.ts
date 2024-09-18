import { Prisma } from "@prisma/client"

export type productInStockAndProductAndPurchase = Prisma.ProductInStockGetPayload<{
    include: {
        product: true, 
        purchase: true
    }
}>

export type ProductWithCategoriesAndBrands = Prisma.ProductGetPayload<{
    include: {
        category: true,
        brand: true
    }
}>