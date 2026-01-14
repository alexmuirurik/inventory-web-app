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
import { useLine } from '@/src/context/useLine'
import AddStockCard from '../cards/add-stock-card'

const AddSaleReport = ({
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
    const [sales, setSales] = useState<z.infer<typeof salesSchema>[]>([])
    const router = useRouter()
    const { toast } = useToast()
    const { isOpen, setIsOpen } = useLine()
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
        if(sales.length === 0) return toast({
            title: 'Error',
            description: 'Please add sales',
            variant: 'destructive',
        })
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
        isOpen && (
            <div className="absolute bg-neutral-100 md:flex gap-2 space-y-4 md:space-y-0 h-96 w-full">
                <AddStockCard items={sales} products={products} />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(addToSale)}
                        className="space-y-4 w-full lg:w-3/12 h-fit border"
                    >
                        {step === 0 ? (
                            <div>
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
                                                        field.onChange(
                                                            option.value
                                                        )
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
                                                            ) + ' items in sale'
                                                        }
                                                        {...field}
                                                        type="number"
                                                        min={0}
                                                        max={
                                                            products.find(
                                                                (product) =>
                                                                    product.id ===
                                                                    form.watch(
                                                                        'productId'
                                                                    )
                                                            )?.stocks[0]
                                                                ?.itemsCount ??
                                                            0
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="p-4 space-y-4">
                                    <LoadingButton className="bg-teal-600 hover:bg-teal-500 w-full">
                                        <span>Add Sale</span>
                                    </LoadingButton>
                                    <LoadingButton
                                        className="w-full"
                                        onClick={() => {
                                            if (sales.length === 0) return
                                            setStep(1)
                                        }}
                                        disabled={sales.length === 0}
                                    >
                                        <span>Next</span>
                                    </LoadingButton>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2 py-2">
                                <div className="flex gap-2 w-full p-4">
                                    <div
                                        className={`${
                                            paymentMethod === 'mobile'
                                                ? 'border-teal-500'
                                                : 'border-neutral-500'
                                        } flex justify-center items-center w-1/2 border p-3 cursor-pointer`}
                                        onClick={() =>
                                            setPaymentMethod('mobile')
                                        }
                                    >
                                        <span>Mobile</span>
                                    </div>
                                    <div
                                        className={`${
                                            paymentMethod === 'cash'
                                                ? 'border-teal-500'
                                                : 'border-neutral-500'
                                        } flex justify-center items-center w-1/2 border p-3 cursor-pointer`}
                                        onClick={() => setPaymentMethod('cash')}
                                    >
                                        <span>Cash</span>
                                    </div>
                                </div>
                                <div className="px-4 space-y-2">
                                    <LoadingButton
                                        className="w-full"
                                        onClick={() => setStep(0)}
                                    >
                                        <span>Back</span>
                                    </LoadingButton>
                                    <LoadingButton
                                        className="bg-teal-600 hover:bg-teal-500 w-full"
                                        onClick={handleSubmit}
                                    >
                                        <span>Complete Sale</span>
                                    </LoadingButton>
                                </div>
                            </div>
                        )}
                    </form>
                </Form>
            </div>
        )
    )
}

export default AddSaleReport
