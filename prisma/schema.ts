import { z } from "zod";

export const businessSchema = z.object({
    name:       z.string(),
    location:   z.string(),
    country:    z.string(),
    city:       z.string(), 
    address:    z.string()
})

export const categorySchema = z.object({
    name: z.string(),
    businessId: z.string()
})

export const brandSchema = z.object({
    name: z.string(),
    businessId: z.string()
})

export const productSchema = z.object({
    name:           z.string(),
    description:    z.string(),
    sku:            z.string(),
    image:          z.string(),
    colors:         z.any(),
    buyingPrice:    z.number(),
    sellingPrice:   z.number(),
    discount:       z.number(),
    stock:          z.number(),
    categoryId:     z.string(),
    brandId:        z.string(),
    status:         z.string()
}) 

