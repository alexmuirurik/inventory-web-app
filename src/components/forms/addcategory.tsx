'use client'
import React, { useState } from 'react'
import CustomDialog from './customdialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { categorySchema } from '@/prisma/schema'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingbutton'
import { Business, BusinessLocation } from '@prisma/client'
import { createCategory } from '@/src/actions/categoryController'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const AddCategory = ({
    businessLocation,
}: {
    businessLocation: BusinessLocation | undefined | null
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const btntitle = 'Add Category'
    const description = 'Add a category to easier sort your category'
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
        },
    })
    const onFormSubmit = async (data: z.infer<typeof categorySchema>) => {
        
        setLoading(true)
        const category = await createCategory(data)
        if (!category) {
            toast({
                title: 'Failed',
                description: 'We Failed to Create Category Please Try Again',
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'We have created a category successfully',
                variant: 'success',
            })
            form.reset({})
        }
        setOpen(false)
        setLoading(false)
        return router.refresh()
    }
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle={btntitle}
            description={description}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="space-y-4"
                >
                    <div className="">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-teal-500">
                                        Category Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Category Name"
                                            className="border-gray-600 text-gray-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end ">
                        <LoadingButton type="submit" loading={loading}>
                            {btntitle}
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddCategory
