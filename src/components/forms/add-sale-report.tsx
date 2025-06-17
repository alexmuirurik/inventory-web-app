import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
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

const AddSaleReport = ({
    form,
    products,
}: {
    form: UseFormReturn<z.infer<typeof salesSchema>>
    products: CompleteProduct[]
}) => {
    const newProducts = products.map((product) => {
        return {
            label: product.name,
            value: product.id,
        }
    })
    return (
        <div className="space-y-4">
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
                                    placeholder="No. of Items"
                                    className="border-gray-600 text-gray-200"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default AddSaleReport
