import React from 'react'
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

const AddSaleReport = () => {
    const form = useForm()
    const handleFormSubmit = () => {}
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-4"
            >
                <FormField
                    name=""
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="text-teal-500">
                                Product Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Product Name"
                                    className="border-gray-600 text-gray-200"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-2">
                    <FormField
                        name=""
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
                        name=""
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
            </form>
        </Form>
    )
}

export default AddSaleReport
