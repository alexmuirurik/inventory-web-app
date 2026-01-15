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
import { salesSchema, stockSchema } from '@/prisma/schema'
import { AutoComplete } from '../ui/autocomplete'
import { CompleteProduct } from '@/prisma/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { BusinessLocation, Stock } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { createStock } from '@/src/actions/stockController'
import { useState } from 'react'
import { LoadingButton } from '../ui/loadingbutton'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { useLine } from '@/src/context/useLine'
import AddStockCard from '../cards/add-stock-card'

const AddstockReport = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'cash'>(
        'cash'
    )
    const [stocks, setstocks] = useState<z.infer<typeof stockSchema>[]>([])
    const router = useRouter()
    const { toast } = useToast()
    const { isOpen, setIsOpen } = useLine()
    const form = useForm<z.infer<typeof stockSchema>>({
        resolver: zodResolver(stockSchema),
    })

    const newProducts = products.map((product) => {
        return {
            label: product.name,
            value: product.id,
        }
    })

    const addTostock = (stock: z.infer<typeof stockSchema>) => {
        const exists = stocks.find(
            (instock) => instock.productId === stock.productId
        )

        if (exists) {
            setstocks((prev) =>
                prev.map((s) => {
                    if (s.productId === stock.productId) {
                        return {
                            ...s,
                            itemsCount: stock.itemsCount,
                            sellingPrice: stock.sellingPrice,
                        }
                    }

                    return s
                })
            )
        } else {
            setstocks((prev) => [...prev, stock])
        }

        form.reset({})
    }

    const deleteItem = (
        item: z.infer<typeof salesSchema> | z.infer<typeof stockSchema>
    ) => {
        const exists = stocks.find(
            (instock) => instock.productId === item.productId
        )

        if (exists) {
            setstocks((prev) =>
                prev.filter((s) => {
                    if (s.productId === item.productId) {
                        return false
                    }

                    return s
                })
            )
        }
    }

    const handleSubmit = async () => {
        if (stocks.length === 0)
            return toast({
                title: 'Error',
                description: 'Please add stocks',
                variant: 'destructive',
            })
        setLoading(true)
        try {
            await createStock({
                businessLocationId: businessLocation?.id as string,
                stocks: stocks,
            })
            toast({
                title: 'Success',
                description: 'stock created successfully',
                variant: 'success',
            })
            setstocks([])
            setIsOpen(false)
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
        isOpen && (
            <div className="absolute bg-neutral-100 md:flex gap-2 space-y-4 md:space-y-0 h-96 w-full">
                <AddStockCard
                    items={stocks}
                    products={products}
                    deleteItem={deleteItem}
                />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(addTostock)}
                        className="space-y-4 w-full lg:w-3/12 h-fit border"
                    >
                        <div className="space-y-3">
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
                            <div className="space-y-3 md:space-y-0 md:flex items-center gap-2 px-4">
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
                                                    placeholder={
                                                        String(
                                                            products.find(
                                                                (product) =>
                                                                    product.id ===
                                                                    form.watch(
                                                                        'productId'
                                                                    )
                                                            )?.stocks[0]
                                                                ?.sellingPrice ??
                                                                0
                                                        ) + ' Ksh'
                                                    }
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
                                                            )?.stocks[0]
                                                                ?.itemsCount ??
                                                                0
                                                        ) + ' items in stock'
                                                    }
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
                            <div className="p-4 space-y-4">
                                <LoadingButton className="bg-teal-600 hover:bg-teal-500 w-full">
                                    <span>Add stock</span>
                                </LoadingButton>
                                <LoadingButton
                                    className="w-full"
                                    onClick={handleSubmit}
                                    loading={loading}
                                    disabled={stocks.length === 0}
                                >
                                    <span>Complete Order</span>
                                </LoadingButton>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        )
    )
}

export default AddstockReport
