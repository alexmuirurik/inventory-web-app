'use client'
import React, { useRef, useState } from "react"
import CustomDialog from "./customdialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { productSchema } from "@/prisma/schema"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loadingbutton"
import { Textarea } from "../ui/textarea"

const AddProduct = () => {
    const [open, setOpen] = useState(false)
    const fileInput = useRef<HTMLInputElement>(null)
    const btntitle = 'Add Product'
    const description = 'Add products to you catelog'
    const form = useForm<z.infer<typeof productSchema>>({ resolver: zodResolver(productSchema) })
    const onFormSubmit = (data: z.infer<typeof productSchema>) => {
        setOpen(false)
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
                        <FormField control={form.control} name='discount' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Discount</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Discount" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />``
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
                        <FormField control={form.control} name='brandId' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Brand</FormLabel>
                                <FormControl>
                                    <Input placeholder="Brand" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='categoryId' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Category" {...field} className="border-gray-600 text-gray-200" />
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
                                    <Input type='file' placeholder="Image" className="border-gray-600 text-gray-200" {...field} ref={fileInput} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='status' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">Status</FormLabel>
                                <FormControl>
                                    <Input placeholder="Status" {...field} className="border-gray-600 text-gray-200" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex justify-end ">
                        <LoadingButton type="submit">{btntitle}</LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddProduct