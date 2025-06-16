'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingbutton'
import { object, z } from 'zod'
import { businessSchema } from '@/prisma/schema'
import { createBusiness, getBusiness } from '@/src/actions/businessController'
import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Business, BusinessLocation, User } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'

const AddBusinessInformation = ({
    user,
    business,
    location,
}: {
    user: User
    business: Business | undefined | null
    location: BusinessLocation | undefined | null
}) => {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof businessSchema>>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            ownerId: user.id,
            name: business?.name,
            mobile: business?.mobile,
            location: location?.name ?? 'Nairobi',
            city: location?.city,
            country: location?.country,
            address: location?.address,
        },
    })
    const handleFormSubmit = async (data: z.infer<typeof businessSchema>) => {
        setLoading(true)
        const newData: z.infer<typeof businessSchema> = {
            ...data,
            location: data.city,
            ownerId: user.id,
        }

        const business = await createBusiness(newData)
        if (business) {
            toast({
                title: 'success',
                description: 'Business created successfully',
                variant: 'success',
            })
        } else {
            toast({
                title: 'Failed',
                description: 'Kindly cotact admin for assistance',
                variant: 'destructive',
            })
        }
        setLoading(false)
        return redirect('/')
    }
    return (
        <Form {...form}>
            <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleFormSubmit)}
            >
                <div className="flex items-center gap-2 w-full">
                    
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="">
                                    Business Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Business Name"
                                        className="border-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="mobile"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="">Mpesa Mobile</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Mpesa Mobile"
                                        className="border-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="City"
                                        className="border-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="country"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Country"
                                        className="border-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <FormField
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Address"
                                        className="border-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-center">
                    <LoadingButton
                        type="submit"
                        disabled={!!business}
                        loading={loading}
                        className="bg-teal-600 hover:bg-teal-500"
                    >
                        <span className="text-nowrap">Save Information</span>
                    </LoadingButton>
                </div>
            </form>
        </Form>
    )
}

export default AddBusinessInformation
