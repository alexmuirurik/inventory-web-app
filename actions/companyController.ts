'use server'
import { slugify } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { companyFormSchema } from "@/prisma/schema"
import { z } from "zod"

export const getCompany = async ( userId: string ) => {
    try {
        const company = await prisma.company.findFirst({
            where: { 
                owner: { 
                    id: userId
                }
            }
        })

        return company
    } catch (err) {
        console.log('We faced an error getting a user company ' + err)
    }
}

export const createCompany = async (data: z.infer<typeof companyFormSchema>) => {
    try{
        const company = await getCompany(data.userId)
        if( company ) return updateCompany(data, company.slug)
    
        const createcompany = await prisma.company.create({ data: {
            title: data.title,
            slug: slugify(data.title),
            description: data.description,
            location: data.location,
            payperword: Number(data.payperword),
            owner: {
                connect: {
                    id: data.userId
                }
            }
        }})

        return createcompany
    } catch (err) {
        console.log('We faced an error creating a company ' + err)
    }
}

export const updateCompany = async (data: z.infer<typeof companyFormSchema>, slug: string) => {
    try {
        const updatecompany = await prisma.company.update({ 
            where:{ 
                slug: slug
            }, 
            data: {
                title: data.title,
                description: data.description,
                location: data.location,
                payperword: Number(data.payperword)
            }
        })
        
        return updatecompany
    } catch (err) {
        console.log('We faced an error updating a user company ' + err)
    }
}