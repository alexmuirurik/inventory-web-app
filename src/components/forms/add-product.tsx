'use client'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import CustomDialog from './customdialog'
import { useState } from 'react'
import { Input } from '../ui/input'
import { LoadingButton } from '../ui/loadingbutton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

const AddProduct = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const form = useForm()

    const handleFormSubmit = () => {}
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle="Add Product"
            description="Add Product to Your Catalog"
        >
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                    <FormField
                        name=""
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">
                                    Product Name
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
                    <div className="md:flex justify-between items-center gap-2 w-full">
                        <FormField
                            name=""
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Starting Stock
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
                        <FormField
                            name=""
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Buying Price
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
                    </div>
                    <div className="flex w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Email
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                className="text-teal-500"
                                                value="m@example.com"
                                            >
                                                m@example.com
                                            </SelectItem>
                                            <SelectItem
                                                className="text-teal-500"
                                                value="m@google.com"
                                            >
                                                m@google.com
                                            </SelectItem>
                                            <SelectItem
                                                className="text-teal-500"
                                                value="m@support.com"
                                            >
                                                m@support.com
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <LoadingButton
                            className="bg-teal-600 hover:bg-teal-500 border-teal-400"
                            loading={loading}
                        >
                            Add Product
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default AddProduct
