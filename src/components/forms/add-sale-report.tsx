'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { salesSchema } from '@/prisma/schema'
import { CompleteProduct } from '@/prisma/types'
import { AutoComplete } from '../ui/autocomplete'
import { zodResolver } from '@hookform/resolvers/zod'
import { BusinessLocation } from '@prisma/client'
import { toast } from 'sonner'
import { createSale } from '@/src/actions/salesController'
import CustomDialog from './customdialog'
import { LoadingButton } from '../ui/loadingbutton'

const AddSaleReport = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof salesSchema>>({
        resolver: zodResolver(salesSchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
        },
    })
    const newProducts = products.map((product) => {
        return {
            label: product.name,
            value: product.id,
        }
    })

    const handleSubmit = async (data: z.infer<typeof salesSchema>) => {
        try {
            setLoading(true)
            const sale = await createSale(data)
            if (sale) {
                toast.success('Sale created successfully')
                form.reset({})
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle="Add Sale"
            description="Add Sales For a Product"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">
                                    Product Name
                                </FormLabel>

                                <FormControl>
                                    <AutoComplete
                                        options={newProducts}
                                        emptyMessage="No results."
                                        placeholder="Find something"
                                        onValueChange={(option) =>
                                            field.onChange(option.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:flex items-center gap-2">
                        <FormField
                            name="sellingPrice"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Selling Price
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Selling Price"
                                            className="border-gray-600 text-gray-200"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="itemsCount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        No. of Items
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                String(
                                                    products.find(
                                                        (product) =>
                                                            product.id ===
                                                            form.watch(
                                                                'productId'
                                                            )
                                                    )?.stocks[0]?.itemsCount ??
                                                        0
                                                ) + ' items in stock'
                                            }
                                            className="border-gray-600 text-gray-200"
                                            {...field}
                                            type="number"
                                            min={0}
                                            max={
                                                products.find(
                                                    (product) =>
                                                        product.id ===
                                                        form.watch('productId')
                                                )?.stocks[0]?.itemsCount ?? 0
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <LoadingButton loading={loading}>
                            Add Sale
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddSaleReport
