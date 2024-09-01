'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useToast } from "../ui/use-toast"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Input } from "../ui/input"
import { folderFormSchema } from "@/prisma/schema"
import { LoadingButton } from "../ui/loadingbtn"
import { createFolder } from "@/actions/FolderController"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Company } from "@prisma/client"

const AddFolder = ({company}: {company: Company | null}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof folderFormSchema>>({ 
        resolver: zodResolver(folderFormSchema), 
        defaultValues: { 
            companyId:  company?.id
        }
    })
    const onFormSubmit = async (data: z.infer<typeof folderFormSchema>) => {
        setLoading(true)
        const createfolder = await createFolder(data)
        if(createfolder) {
            toast({
                title: 'Folder Created',
                description: 'Folder Created Successfully. You can add tasks now',
                variant: 'success'
            })
            router.refresh()
            setOpen(false)
        }
        return setLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-teal-500 hover:bg-teal-700">Add a Folder</Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 border-gray-600">
                <DialogHeader className="flex flex-col !justify-center !text-center">
                    <DialogTitle className="text-gray-300 mb-2">Add a Folder</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid gap-4" >
                        <FormField control={form.control} name='title' render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-right text-gray-300 mb-2" >Title</FormLabel>
                                <FormControl >
                                    <Input className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='description' render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-right text-gray-300 mb-2" >Description</FormLabel>
                                <FormControl >
                                    <Textarea className="border-gray-600 text-gray-300 placeholder:text-gray-500 w-full" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <div className="flex !justify-center text-center ">
                            <LoadingButton loading={loading} type="submit" className="text-gray-300 border-gray-600" variant='outline'>
                                Add Folder
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


export default AddFolder