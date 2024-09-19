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
import { Brand, Business, Category } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import ImageUploader from "./imageuploader"
import { createProduct } from "@/actions/productController"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

const AddProduct = ({ business, categories, brands }: { business: Business, categories: Category[], brands: Brand[] }) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const btntitle = 'Add Product'
    const description = 'Add products to you catelog'
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            businessId: business.id,
        }
    })
    const onFormSubmit = async (data: z.infer<typeof productSchema>) => {
        setLoading(true)
        const product = await createProduct(data)
        if (product) {
            toast({
                title: 'Success',
                description: 'Product Created Successfully',
                variant: 'success'
            })
            setOpen(false)
        } else {
            toast({
                title: 'Failed',
                description: 'We failed creating a product',
                variant: 'destructive'
            })
        }
        router.refresh()
        setLoading(false)
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
                        <FormField control={form.control} name='categoryId' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="text-gray-200 placeholder:text-gray-500 border-gray-500">
                                            <SelectValue className="text-gray-200 placeholder:text-sm" placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-neutral-700 text-gray-300 border-gray-500">
                                        {categories.map(category => (
                                            <SelectItem value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='brandId' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Brand</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="text-gray-200 placeholder:text-gray-500  border-gray-500">
                                            <SelectValue className="text-gray-200 placeholder:text-sm" placeholder="Select brand" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-neutral-700 text-gray-300 border-gray-500">
                                        {brands.map(brand => (
                                            <SelectItem value={brand.id}>{brand.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tags" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <ImageUploader form={form} />
                        <FormField control={form.control} name='status' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Status</FormLabel>
                                <FormControl>
                                    <Input placeholder="Status" className="border-gray-600 text-gray-200"  {...field} />
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