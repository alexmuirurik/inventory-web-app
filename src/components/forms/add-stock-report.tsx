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
import { BusinessLocation, Stock } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { createStock } from '@/src/actions/stockController'
import { toast } from 'sonner'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingbutton'
import CustomSheet from '../ui/custom-sheet'
import { useRouter } from 'next/navigation'

const AddStockReport = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [stocks, setStocks] = useState<z.infer<typeof stockSchema>[]>([])
    const router = useRouter()
    const form = useForm<z.infer<typeof stockSchema>>({
        resolver: zodResolver(stockSchema),
    })

    const newProducts = products.map((product) => {
        return {
            label: product.name,
            value: product.id,
        }
    })

    const addToStock = (stock: z.infer<typeof stockSchema>) => {
        const exists = stocks.find(
            (inStock) => inStock.productId === stock.productId
        )

        if (exists) {
            setStocks((prev) =>
                prev.map((s) => {
                    if (s.productId === stock.productId) {
                        return {
                            ...s,
                            itemsCount: stock.itemsCount,
                            buyingPrice: stock.buyingPrice,
                        }
                    }

                    return s
                })
            )
        } else {
            setStocks((prev) => [...prev, stock])
        }

        form.reset({})
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const stock = await createStock({
                businessLocationId: businessLocation?.id as string,
                stocks: stocks,
            })
            if (stock) {
                toast.success('Stock created successfully')
            }
        } catch (error) {
            toast.error(`Error: ${error}`)
        } finally {
            setStocks([])
            form.reset({})
            setLoading(false)
            router.refresh()
        }
    }

    return (
        <CustomSheet
            open={open}
            onOpenChange={setOpen}
            title="Add Stock"
            description="Add Stocks For a Product"
            stocks={stocks}
            products={products}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(addToStock)}
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
                                                ) + ' items in stock'
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
                        <LoadingButton>Add Stock</LoadingButton>
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

export default AddStockReport
