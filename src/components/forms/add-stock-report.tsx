'use client'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { stockSchema } from '@/prisma/schema'
import { AutoComplete } from '../ui/autocomplete'
import { CompleteProduct } from '@/prisma/types'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/src/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

const AddStockReport = ({
    form,
    products,
}: {
    form: UseFormReturn<z.infer<typeof stockSchema>>
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
            <div className="flex">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-teal-500">
                                Date 
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className="border-gray-600 text-gray-200"
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full p-0"
                                    align="center"
                                >
                                    <Calendar
                                        className="w-full"
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
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

export default AddStockReport
