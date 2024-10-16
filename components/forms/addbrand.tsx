'use client'
import React, { useState } from "react"
import CustomDialog from "./customdialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { brandSchema } from "@/prisma/schema"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loadingbutton"
import { Business } from "@prisma/client"
import { createBrand } from "@/actions/brandController"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

const AddBrand = ({ business }: { business: Business | undefined}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const btntitle = 'Add Brand'
    const description = 'Add a brand to easier sort your brand'
    const form = useForm<z.infer<typeof brandSchema>>({ 
        resolver: zodResolver(brandSchema), 
        defaultValues: { businessId: business?.id } 
    })
    const onFormSubmit = async (data: z.infer<typeof brandSchema>) => {
        setOpen(false)
        setLoading(true)
        const brand = await createBrand(data)
        if (!brand) {
            toast({
                title: 'Failed', 
                description: "We Failed to Create brand Please Try Again",
                variant: 'destructive'
            })
        } else {
            toast({
                title: 'Success', 
                description: "We have created a brand successfully",
                variant: 'success'
            })
            form.reset({})
        }
        setLoading(false)
        return router.refresh()
    }
    return (
        <CustomDialog open={open} setOpen={setOpen} btntitle={btntitle} description={description}   >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="">
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="text-teal-500">Brand Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Brand Name" className="border-gray-600 text-gray-200" {...field} />
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

export default AddBrand