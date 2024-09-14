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

export const productSchema = z.object({
    title: z.string()
}) 

