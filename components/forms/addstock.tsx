'use client'
import React, { useState } from 'react';
import CustomDialog from './customdialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loadingbutton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockSchema } from '@/prisma/schema';
import ComboboxField from './comboboxfield';
import { BusinessLocation, Product } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createProductInStock } from '@/actions/productController';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const AddStock = ({ products, businessLocations }: { products: Product[], businessLocations: BusinessLocation[] }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const btntitle = 'Add Stock'
    const description = 'Add Product stocks to a location'
    const form = useForm<z.infer<typeof stockSchema>>({ resolver: zodResolver(stockSchema) })
    const onFormSubmit = async (data: z.infer<typeof stockSchema>) => {
        setLoading(true)
        const stock = await createProductInStock(data)
        if(stock) {
            toast({
                title: 'Success',
                description: 'Stock Added Successfully',
                variant: 'success'
            })
            setOpen(false)
            form.reset({})
            router.refresh()
        } else {
            toast({
                title: 'Failed',
                description: 'Stock Was Not Added Successfully',
                variant: 'destructive'
            })
        }
        return setLoading(false)
    }

    return (
        <CustomDialog open={open} setOpen={setOpen} btntitle={btntitle} description={description}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="flex">
                        <FormField control={form.control} name='productId' render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className='text-teal-500 w-1/3'>Select Product</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='text-gray-300'>
                                            <SelectValue className='text-gray-300 placeholder:text-gray-400' placeholder="Select Product" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-neutral-600 text-gray-300'>
                                        {products.map(product => (
                                            <SelectItem key={product.id} value={product.id}>
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex">
                        <FormField control={form.control} name='businessLocationId' render={({ field }) => (
                            <FormItem className="w-full ">
                                <FormLabel className='text-teal-500 w-1/3'>Business Location</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='text-gray-300'>
                                            <SelectValue className='text-gray-300 placeholder:text-gray-400' placeholder="Select Location" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='bg-neutral-600 text-gray-300'>
                                        {businessLocations.map(businessLocation => (
                                            <SelectItem key={businessLocation.id} value={businessLocation.id}>
                                                {businessLocation.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='buyingPrice' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-teal-500 w-1/3'>Buying Price</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Buying Price' className='text-gray-300' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='sellingPrice' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-teal-500 w-1/3'>Selling Price</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Selling Price' className='text-gray-300' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='discount' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-teal-500 w-1/3'>Discount</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Discount' className='text-gray-300' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='count' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-teal-500 w-1/3'>Items in Stock</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder='Items in Stock' className='text-gray-300' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <div className="md:flex gap-2">
                        <FormField control={form.control} name='colors' render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-teal-500 w-1/3'>Colors</FormLabel>
                                <FormControl>
                                    <Input placeholder='Colors (Separate with a comma)' className='text-gray-300' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex justify-end ">
                        <LoadingButton type="submit" loading={loading}>{btntitle}</LoadingButton>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    );
}

export default AddStock;
