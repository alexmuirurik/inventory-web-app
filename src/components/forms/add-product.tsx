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
import { BusinessLocation, Category } from '@prisma/client'
import { z } from 'zod'
import { productSchema } from '@/prisma/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCategory } from '@/src/actions/categoryController'
import { createProduct } from '@/src/actions/productController'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const AddProduct = ({
    categories,
    businessLocation,
}: {
    categories: Category[]
    businessLocation: BusinessLocation | undefined | null
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
            status: 'in-stock',
        },
    })

    const createNewCategory = async () => {
        setLoading(true)
        const category = await createCategory({
            businessLocationId: businessLocation?.id as string,
            name: 'Uncategorized',
        })
        if (category) {
            console.log(category)
            router.refresh()
        }

        return setLoading(false)
    }

    const handleFormSubmit = async (data: z.infer<typeof productSchema>) => {
        let categoryId = data.categoryId
        setLoading(true)
        if (data.categoryId === 'Uncategorized') {
            const category = await createCategory({
                businessLocationId: businessLocation?.id as string,
                name: data.categoryId,
            })
            categoryId = category?.id as string
        }

        const product = await createProduct({ ...data, categoryId: categoryId })
        if (product) {
            toast({
                title: 'Success',
                description: 'Product created successfully',
                variant: 'success',
            })
        } else {
            toast({
                title: 'Failed',
                description: 'Kindly contact admin for assistance',
                variant: 'destructive',
            })
        }
        setLoading(false)
        return router.refresh()
    }
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
                    <div className="md:flex justify-between items-center gap-2 w-full">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
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
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-teal-500">
                                        Category Name
                                    </FormLabel>
                                    <Select
                                        onValueChange={(val) =>
                                            form.setValue('categoryId', val)
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger className="border-gray-600 text-gray-200 placeholder:text-gray-600">
                                                <SelectValue
                                                    className="text-neutral-600"
                                                    placeholder="Select category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-neutral-700 border-gray-500">
                                            {categories.length === 0 && (
                                                <SelectItem
                                                    className="text-teal-500 hover:bg-neutral-600"
                                                    value="Uncategorized"
                                                >
                                                    Uncategorized
                                                </SelectItem>
                                            )}
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    className="text-teal-500 hover:bg-neutral-600"
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
                    <FormField
                        name="units"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">
                                    Units
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Units"
                                        className="border-gray-600 text-gray-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
