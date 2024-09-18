import { z } from "zod";

export const businessSchema = z.object({
    name: z.string(),
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

export const productSchema = z.object({
    name: z.string(),
    businessId: z.string(),
    description: z.string(),
    image: z.array(z.object({
        name: z.string(),
        size: z.number(),
        type: z.string()
    })).refine((files) => 
        files.every((file) => 
            file.size <= 50000000 && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        ), 
        "Item image: Only .jpeg, .jpg, .png files of 5MB or less are accepted."
    ).optional(),
    categoryId: z.string(),
    brandId: z.string(),
    status: z.string()
})

