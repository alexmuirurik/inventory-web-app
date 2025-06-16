import { z } from "zod";

export const businessSchema = z.object({
    name: z.string(),
    mobile: z.string(),
    location: z.string(),
    country: z.string(),
    city: z.string(),
    address: z.string(),
    ownerId: z.string()
})

export const categorySchema = z.object({
    name: z.string(),
    businessLocationId: z.string()
})

export const brandSchema = z.object({
    name: z.string(),
    businessId: z.string()
})


export const productSchema = z.object({
    name: z.string(),
    businessId: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.string().optional(),
    status: z.string()
})

