'use client'
import React, { useRef, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stockSchema } from '@/prisma/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loadingbutton';
import { Product } from '@prisma/client';
import { createProductInStock } from '@/actions/productController';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const AddStock = ({product, businessLocationId}: {product: Product, businessLocationId: string}) => {
    const [loading, setLoading] = useState(false)
    const [sizes, setSizes] = useState([
        {size: 's', available: false}, 
        {size: 'm', available: false}, 
        {size: 'l', available: false}, 
        {size: 'xl', available: false}
    ])
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof stockSchema>>({ 
        resolver: zodResolver(stockSchema),
        defaultValues: {
            businessLocationId: businessLocationId,
            productId: product.id
        } 
    })
    const onFormSubmit = async (data: z.infer<typeof stockSchema>) => {
        setLoading(true)
        const newsizes = sizes.reduce((prev:string[], curr) => { 
            if(curr.available) prev.push(curr.size)
            return prev
        }, [])
        const createorupdatestock = await createProductInStock({...data, sizes: newsizes})
        if(createorupdatestock) {
            router.refresh()
            toast({
                title: 'Success',
                description: 'Stock Added Successfully',
                variant: 'success'
            })
        }
        setLoading(false)
    }

    const handleClick = (size: string) => {
        const newsizes = sizes.map(item => (item.size === size) ? {...item, available: !item.available} : item )
        setSizes(newsizes)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-2'>
                <div className="flex">
                    <FormField name='sizes' control={form.control} render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-teal-500'>Sizes</FormLabel>
                            <FormControl className='flex'>
                                <div className="flex justify-evenly gap-2 ">
                                    { sizes.map(size => {
                                        const active = size.available ? 'bg-teal-500' : "hover:bg-teal-400"
                                        return <div key={size.size} className={ active + " border px-6 py-3 cursor-pointer "} onClick={() => handleClick(size.size)}>
                                            {size.size}
                                        </div>
                                    })}
                                </div>
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
                <div className="flex gap-2">
                    <FormField name='discount' control={form.control} render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-teal-500'>Discount</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField name='count' control={form.control} render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-teal-500'>Items in Stock</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
                <div className="flex justify-center">
                    <LoadingButton className='bg-teal-600' type="submit" loading={loading}>
                        Update Stock
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}

export default AddStock;
