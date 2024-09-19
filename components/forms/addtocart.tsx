'use client'
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { cartSchema } from '@/prisma/schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '../ui/loadingbutton';
import { Input } from '../ui/input';
import ComboboxField from './comboboxfield';
import { Business, Product, Supplier } from '@prisma/client';
import { useToast } from '../ui/use-toast';
import { createPurchase } from '@/actions/checkoutController';
import { useRouter } from 'next/navigation';

const AddToCart = ({businessLocation, products, suppliers}: {businessLocation: string, products: Product[], suppliers: Supplier[]}) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof cartSchema>>({ 
        resolver: zodResolver(cartSchema),
        defaultValues: { businessLocationId: businessLocation, discount: '0' }
     })
    const balance = Number(form.getValues('sellingPrice')) - Number(form.getValues('buyingPrice'))
    const discountedProfit = ((100 - Number(form.getValues('discount'))) / 100) * balance 
    const onItemSubmit = async (data: z.infer<typeof cartSchema>) => {
        setLoading(true)
        const purchase = await createPurchase(data)
        if(purchase){
            toast({
                title: 'Success',
                description: 'Item Added Successfully',
                variant: 'success'
            })
            router.refresh()
        }else{
            toast({
                title: 'Failed',
                description: 'Item Not Added At All',
                variant: 'destructive'
            })
        }
        setLoading(false)
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onItemSubmit)} className='space-y-4'>
            <div className="titl space-y-2">
                <div className="flex">
                    <ComboboxField form={form} data={products} formItem='productId' itemname='Product'/>
                </div>
                <div className="flex">
                    <ComboboxField form={form} data={suppliers} formItem='supplierId' itemname='Supplier' />
                </div>
            </div>
            <div className="space-y-2">
                <h4 className='font-bold'>Buying Funds</h4>
                <div className="flex">
                    <FormField control={form.control} name='buyingPrice' render={({ field }) => (
                        <FormItem className='flex items-center w-full'>
                            <FormLabel className='text-xs w-1/3'>Buying Price</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Buying Price' className='w-2/3' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
                <div className="flex">
                    <FormField control={form.control} name='sellingPrice' render={({ field }) => (
                        <FormItem className='flex items-center w-full'>
                            <FormLabel className='text-xs w-1/3'>Selling Price</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Selling Price' className='w-2/3' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
                <div className="flex">
                    <FormField control={form.control} name='discount' render={({ field }) => (
                        <FormItem className='flex items-center w-full'>
                            <FormLabel className='text-xs w-1/3'>Discount</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Discount' className='w-2/3' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                </div>
            </div>
            <div className="bg-neutral-300 w-full p-2 space-y-4">
                <div className="flex justify-between title p-1">
                    <span className='text-xs'>Selling Price SubTotal</span>
                    <span className='text-sm font-bold'>${form.getValues('sellingPrice')}.00</span>
                </div>
                <div className="flex justify-between title p-1">
                    <span className='text-xs'>SubTotal Spent</span>
                    <span className='text-sm font-bold'>${form.getValues('buyingPrice')}.00</span>
                </div>
                <div className="flex justify-between p-1">
                    <span className='text-xs'>Profit</span>
                    <span className='text-sm font-bold'>${ Number.isNaN(discountedProfit) ? 0 : discountedProfit }.00</span>
                </div>
            </div>
            <div className="flex">
                <LoadingButton className='bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 font-mono font-bold w-full' 
                    type="submit" loading={loading} >
                    Add to Cart
                </LoadingButton>
            </div>
        </form>
    </Form>
}

export default AddToCart;
