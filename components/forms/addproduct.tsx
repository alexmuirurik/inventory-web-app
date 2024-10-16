'use client'
import React, { useState } from "react"
import CustomDialog from "./customdialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { productSchema } from "@/prisma/schema"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loadingbutton"
import { Textarea } from "../ui/textarea"
import { Business } from "@prisma/client"
import { createProduct } from "@/actions/productController"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import FileResizer from "react-image-file-resizer"

const AddProduct = ({ business }: { business: Business }) => {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const btntitle = 'Add Product'
    const description = 'Add products to you catelog'
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: { businessId: business.id, image: preview, status: 'out-of-stock' }
    })
    const onFormSubmit = async (data: z.infer<typeof productSchema>) => {
        setLoading(true)
        const product = await createProduct({ ...data, image: preview })
        if (product) {
            toast({
                title: 'Success',
                description: 'Product Created Successfully',
                variant: 'success'
            })
            setLoading(false)
            setOpen(false)
            router.refresh()
        } else {
            toast({
                title: 'Failed',
                description: 'We failed creating a product',
                variant: 'destructive'
            })
            setLoading(false)
        }
    }
    return (
        <CustomDialog open={open} setOpen={setOpen} btntitle={btntitle} description={description}   >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage /> 
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='image' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Image</FormLabel>
                                <FormControl>
                                    <Avatar className="flex items-center gap-8 border border-gray-600 rounded-sm px-3 py-0.5 w-full cursor-pointer"
                                        onClick={() => document.getElementById('image')?.click()}>
                                        <Input id="image" type='file' accept="image/*" className="border-gray-600 text-gray-200 hidden" onChange={async (e) => {
                                            const file = e?.target?.files?.[0]
                                            FileResizer.imageFileResizer(file as File, 300, 300, "JPEG", 100, 0,(url) => { setPreview(url as string) }, "base64" )
                                        }} />
                                        <AvatarImage className="border border-gray-600 w-20 aspect-video" src={preview} alt="" />
                                        {(preview !== '') && <span className="text-xs text-gray-400">Change Image</span>}
                                        <AvatarFallback className="bg-transparent text-center text-sm text-white rounded-sm w-full">
                                            Choose an Image
                                        </AvatarFallback>
                                    </Avatar>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="">
                        <FormField control={form.control} name='description' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='tags' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tags" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex justify-end ">
                        <LoadingButton type="submit" loading={loading}>{btntitle}</LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddProduct