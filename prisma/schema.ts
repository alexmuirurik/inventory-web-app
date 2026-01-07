import { z } from 'zod'

export const businessSchema = z.object({
    name: z.string(),
    mobile: z.string(),
    location: z.string(),
    country: z.string(),
    city: z.string(),
    address: z.string(),
    ownerId: z.string(),
})

export const categorySchema = z.object({
    name: z.string(),
    businessLocationId: z.string(),
})

export const productSchema = z.object({
    name: z.string(),
    businessLocationId: z.string(),
    units: z.string(),
    status: z.string(),
    categoryId: z.string(),
})

export const stockSchema = z.object({
    productId: z.string(),
    businessLocationId: z.string(),
    buyingPrice: z.coerce.number(),
    itemsCount: z.coerce.number(),
})

export const salesSchema = z.object({
    productId: z.string(),
    businessLocationId: z.string(),
    sellingPrice: z.coerce.number(),
    itemsCount: z.coerce.number(),
})

export const pettySchema = z.object({
    date: z.date(),
    businessLocationId: z.string(),
    pettyCash: z.coerce.number(),
    losses: z.coerce.number(),
    miscellaneous: z.coerce.number(),
})
