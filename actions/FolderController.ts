'use server'
import { slugify } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { folderFormSchema } from "@/prisma/schema"
import { z } from "zod"

export const getSingleFolder = async (slug: string) =>{
    try { 
        const folder = prisma.folder.findUnique({ 
            where: {
                slug: slug
            }
        })
        
        return folder
    } catch (err) {
        console.log('We faced an error getting a single folder ' + err)
    }
}

export const getFolders = async (companyId: string) => {
    try {
        const folders = prisma.folder.findMany({
            where:{
                company: {
                    id: companyId
                }
            }
        })
        return folders
    } catch (err) {
        console.log('We ran into a problem getting folders ' + err)
    }
}

export const createFolder = async (data: z.infer<typeof folderFormSchema>) => {
    try{
        const createfolder = prisma.folder.upsert({
            where: { 
                slug: slugify(data.title) 
            },
            update: { 
                title: data.title,
                description: data.description 
            },
            create: {
                slug: slugify(data.title),
                title: data.title,
                description: data.description,
                company: { 
                    connect: { 
                        id: data.companyId 
                    } 
                }
            }
        }) 
        return createfolder
    } catch(err){
        console.log('We ran into a problem creating a folder ' + err)
    }
}