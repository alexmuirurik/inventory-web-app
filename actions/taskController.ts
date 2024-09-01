'use server'
import { slugify } from "@/lib/utils"
import prisma from "@/prisma/prisma"
import { taskFormSchema, writeTaskFormSchema } from "@/prisma/schema"
import { z } from "zod"

export const getTask = async (slug: string) => {
    try {
        const task = await prisma.task.findUnique({ 
            where: {
                slug: slug
            }
        })
        
        return task
    } catch (err) {
        console.log('We faced an error getting a single task ' + err)
    }
}

export const getFolderTasks = async (folderId: string) => {
    try { 
        const tasks = await prisma.task.findMany({ 
            where: {
                folderId: folderId
            }
        })
        
        return tasks
    } catch (err) {
        console.log('We faced an error getting folder tasks ' + err )
    }
}

export const createTask = async ( data: z.infer<typeof taskFormSchema> ) => {
    try {
        const createtask = await prisma.task.upsert({
            where: { 
                slug: slugify(data.title)
            },
            update: {
                title: slugify(data.title),
                instructions: data.instructions,
                deadline: Number(data.deadline),
                wordcount: Number(data.wordcount),
            },
            create: {
                slug: slugify(data.title), 
                title: data.title,
                instructions: data.instructions,
                wordcount: Number(data.wordcount),
                deadline: Number(data.deadline),
                status: data.status,
                folder: {
                    connect: { 
                        id: data.folderId
                    }
                },
                company: { 
                    connect: { 
                        id: data.companyId 
                    }
                }
            }
        })

        return createtask
    } catch (err) {
        console.log('We faced an error creating a task ' + err)
    }
}

export const updateTask = async (data: z.infer<typeof writeTaskFormSchema>) => {
    try {
        const updatetask = await prisma.task.update({
            where: {
                slug: data.slug
            },
            data: {
                title: data.title,
                content: data.content
            }
        })

        return updatetask
    } catch (err) {
        console.log('We faced an error updating a task ' + err)
    }
}