'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const AddStockReport = () => {
    const form = useForm()
    const handleFormSubmit = () => {}
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <FormField
                    name=""
                    control={form.control}
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
            </form>
        </Form>
    )
}

export default AddStockReport
