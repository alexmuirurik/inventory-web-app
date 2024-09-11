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

const AddProduct = () => {
    const [open, setOpen] = useState(false)
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
                    <div className="">
                        <FormField control={form.control} name='title' render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Title" {...field} />
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