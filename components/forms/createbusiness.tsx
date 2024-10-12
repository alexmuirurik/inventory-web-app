'use client'
import React, { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Input } from "../ui/input"
import { LoadingButton } from "../ui/loadingbutton"
import { businessSchema } from "@/prisma/schema"
import { createBusiness } from "@/actions/businessController"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Business, BusinessLocation } from "@prisma/client"
import { useCompanyContext } from "@/context/usecompany"

const CreateBusiness = ({ business, location }: { business: Business | undefined, location: BusinessLocation | undefined }) => {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const {logo} = useCompanyContext()
    const router = useRouter()
    const form = useForm<z.infer<typeof businessSchema>>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            name: business?.name,
            location: location?.name,
            address: location?.address,
            city: location?.city,
            country: location?.country
        }
    })
    const onFormSubmit = async (data: z.infer<typeof businessSchema>) => {
        setLoading(true)
        const business = await createBusiness({...data, logo: logo })
        if (!business) {
            toast({
                title: 'Failed',
                description: 'Please Try Again',
                variant:'destructive'
            })
        } else {
            toast({
                title: 'Success',
                description: 'Business Created Successfully',
                variant:'success'
            })
        }
        setLoading(false)
        return router.refresh()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="sm:flex gap-3">
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='address' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="sm:flex gap-3">
                    <FormField control={form.control} name='location' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Location Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='mobile' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Mobile</FormLabel>
                            <FormControl>
                                <Input placeholder="Mobile Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="sm:flex gap-3">
                    <FormField control={form.control} name='city' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='country' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="flex justify-end ">
                    <LoadingButton type="submit" className="bg-teal-600" loading={loading}>Add Business</LoadingButton>
                </div>
            </form>
        </Form>
    )
}

export default CreateBusiness