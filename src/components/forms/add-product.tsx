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
import { Category } from '@prisma/client'

const AddProduct = ({ categories }: { categories: Category[] }) => {
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
                                        Category Name
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="border-gray-600 text-gray-200 placeholder:text-gray-600">
                                                <SelectValue className='text-neutral-600' placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-neutral-700 border-gray-500">
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    className="text-teal-500"
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
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
