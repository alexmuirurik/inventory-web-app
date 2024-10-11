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
    count: z.string(),
    buyingPrice: z.string(),
    sellingPrice: z.string(),
    discount: z.string(),
    businessLocationId: z.string(),
    colors: z.string()
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

