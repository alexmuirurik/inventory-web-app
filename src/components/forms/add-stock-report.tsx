'use client'

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
import { stockSchema } from '@/prisma/schema'
import { AutoComplete } from '../ui/autocomplete'
import { CompleteProduct } from '@/prisma/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { BusinessLocation } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { createStock } from '@/src/actions/stockController'
import { toast } from 'sonner'
import CustomDialog from './customdialog'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingbutton'

const AddStockReport = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof stockSchema>>({
        resolver: zodResolver(stockSchema),
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

    const handleSubmit = async (data: z.infer<typeof stockSchema>) => {
        setLoading(true)
        try {
            const stock = await createStock(data)
            if (stock) {
                toast.success('Stock created successfully')
                form.reset({})
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        }finally{
            setLoading(false)
        }
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle="Add Stock"
            description="Add Stocks For a Product"
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
                            name="buyingPrice"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Buying Price
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Buying Price"
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {Object.keys(form.formState.errors).map((error) => (
                        <p key={error} className="text-red-500">
                          {error} : {(form.formState.errors as any)[error]?.message}
                        </p>
                    ))}
                    <div className="flex justify-end">
                        <LoadingButton loading={loading}>
                            Add Stock
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddStockReport
