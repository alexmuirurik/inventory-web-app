import { z } from "zod";

export const businessSchema = z.object({
    name: z.string(),
    mobile: z.string(),
    logo: z.string().optional(),
    location: z.string(),
    country: z.string(),
    city: z.string(),
    address: z.string()
})

export const categorySchema = z.object({
    name: z.string(),
    businessId: z.string()
})

export const brandSchema = z.object({
    name: z.string(),
    businessId: z.string()
})

export const comboboxSchema = z.object({
    productId: z.string(),
    supplierId: z.string(),
    
})

export const stockSchema = z.object({
    productId: z.string(),
    businessLocationId: z.string(),
    count: z.string(),
    discount: z.string(),
    sizes: z.array(z.string()).optional()
})

export const cartSchema = z.object({
    businessLocationId: z.string()
})

export const checkoutSchema = z.object({
    businessLocationId: z.string(),
    customerId: z.string(),
    sellingPrice: z.number(),
    buyingPrice: z.number(),
    count: z.number(),
    productId: z.string(),
})

export const updateProductSChema = z.object({
    productId: z.string(),
    name: z.string(),
    description: z.string(),
    categoryId: z.string(),
    brandId: z.string(),
    buyingPrice: z.string(),
    sellingPrice: z.string(),
    image: z.string().optional(),
    tags: z.string().optional(),
    variants: z.string().optional(),
})

export const productSchema = z.object({
    name: z.string(),
    businessId: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.string().optional(),
    status: z.string()
})

