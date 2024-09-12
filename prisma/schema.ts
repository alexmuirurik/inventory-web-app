import { z } from "zod";

export const businessSchema = z.object({
    name:       z.string(),
    location:   z.string(),
    country:    z.string(),
    city:       z.string(), 
    address:    z.string()
})

export const productSchema = z.object({
    title: z.string()
}) 

