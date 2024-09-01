import { z } from "zod";

export const inviteWriterFormSchema = z.object({ 
    email: z.string().email() 
})

export const companyFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    location: z.string(),
    payperword: z.string(),
})

export const folderFormSchema = z.object({
    title: z.string(),
    description: z.string(),
    companyId: z.string()
})

export const taskFormSchema = z.object({
    title: z.string(),
    instructions: z.string(),
    wordcount: z.string(),
    status: z.string().default('pending-writer'),
    deadline: z.string(),
    companyId: z.string(),
    folderId: z.string()
})

export const writeTaskFormSchema = z.object({
    slug: z.string(),
    title: z.string(),
    content: z.string(),
})
