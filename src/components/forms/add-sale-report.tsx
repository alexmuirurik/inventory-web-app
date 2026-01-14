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
import { salesSchema } from '@/prisma/schema'
import { AutoComplete } from '../ui/autocomplete'
import { CompleteProduct } from '@/prisma/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { BusinessLocation, Sale } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { createSale } from '@/src/actions/salesController'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingbutton'
import CustomSheet from '../ui/custom-sheet'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

const AddSaleReport = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sales, setSales] = useState<z.infer<typeof salesSchema>[]>([])
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof salesSchema>>({
        resolver: zodResolver(salesSchema),
    })

    const newProducts = products.map((product) => {
        return {
            label: product.name,
            value: product.id,
        }
    })

    const addToSale = (sale: z.infer<typeof salesSchema>) => {
        const exists = sales.find(
            (inSale) => inSale.productId === sale.productId
        )

        if (exists) {
            setSales((prev) =>
                prev.map((s) => {
                    if (s.productId === sale.productId) {
                        return {
                            ...s,
                            itemsCount: sale.itemsCount,
                            buyingPrice: sale.sellingPrice,
                        }
                    }

                    return s
                })
            )
        } else {
            setSales((prev) => [...prev, sale])
        }

        form.reset({})
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await createSale({
                businessLocationId: businessLocation?.id as string,
                sales: sales,
            })
            toast({
                title: 'Success',
                description: 'Sale created successfully',
                variant: 'success',
            })
            setSales([])
            form.reset({})
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error',
                description: `${error}`,
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <CustomSheet
            open={open}
            onOpenChange={setOpen}
            title="Add Sale"
            description="Add Sales For a Product"
            stocks={sales}
            products={products}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(addToSale)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="productId"
                        render={({ field }) => (
                            <FormItem className="w-full px-4 pt-4">
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
                    <div className="md:flex items-center gap-2 px-4">
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
                                            className="text-gray-200"
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
                                                ) + ' items in sale'
                                            }
                                            className=" text-gray-200"
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
                    <div className="flex justify-end px-4">
                        <LoadingButton>Add Sale</LoadingButton>
                    </div>
                    <div className="w-full border-t rounded-none p-4">
                        <LoadingButton
                            className="w-full"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Finish and Submit
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomSheet>
    )
}

export default AddSaleReport
