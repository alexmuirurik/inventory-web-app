'use client'
import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProductSChema } from '@/prisma/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LoadingButton } from '../ui/loadingbutton';
import { Brand, Category, Product } from '@prisma/client';
import SearchAndSelect from './searchandselect';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import FileResizer from 'react-image-file-resizer';
import { updateProduct } from '@/actions/productController';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const EditProduct = ({ brands, categories, product }: { brands: Brand[], categories: Category[], product: Product | undefined }) => {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState(product?.image ?? '')
    const {toast} = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof updateProductSChema>>({ 
        resolver: zodResolver(updateProductSChema),
        defaultValues: {
            productId: product?.id as string
        }
    })
    const onFormSubmit = async (data: z.infer<typeof updateProductSChema>) => {
        setLoading(true)
        const updatedproduct = await updateProduct(data)
        if(updatedproduct) {
            router.refresh()
            toast({
                title: 'Success',
                description: 'Product updated successfully',
                variant: 'success'
            })
        }else {
            toast({
                title: 'Failed',
                description: 'Product Update Failed',
                variant: 'destructive'
            })
        }
        setLoading(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
                <div className="md:flex gap-2">
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-teal-500 text-xs">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} className=" " defaultValue={product?.name} />
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )} />
                </div>
                <div className="md:flex gap-2">
                    <FormField control={form.control} name='categoryId' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Category</FormLabel>
                            <FormControl>
                                <SearchAndSelect title='Category' defaultValue={product?.categoryId} list={categories} onValueChange={(value) => form.setValue(field.name, value) } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='brandId' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Brand</FormLabel>
                            <FormControl>
                                <SearchAndSelect title='Brand' defaultValue={product?.brandId} list={brands} onValueChange={(value) => form.setValue(field.name, value)}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="md:flex gap-2">
                    <FormField control={form.control} name='buyingPrice' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Buying Price</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Buying Price' {...field} defaultValue={String(product?.buyingPrice)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='sellingPrice' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Selling Price</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Selling Price' {...field} defaultValue={String(product?.sellingPrice)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="">
                    <FormField control={form.control} name='description' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} className=" " defaultValue={product?.description} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="">
                    <FormField control={form.control} name='variants' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Variants</FormLabel>
                            <FormControl>
                                <Input placeholder='Variants' {...field} defaultValue={product?.variants?.toLocaleString()} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="md:flex gap-2">
                    <FormField control={form.control} name='image' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Image</FormLabel>
                            <FormControl>
                                <Avatar className="flex items-center gap-8 border rounded-sm px-3 py-0.5 w-full cursor-pointer"
                                    onClick={() => document.getElementById('image')?.click()}>
                                    <Input id="image" type='file' accept="image/*" className=" hidden" onChange={async (e) => {
                                        const file = e?.target?.files?.[0]
                                        FileResizer.imageFileResizer(file as File, 300, 300, "JPEG", 100, 0, (url) => { setPreview(url as string) }, "base64")
                                    }} />
                                    <AvatarImage className="border w-20 aspect-video" src={preview} alt="" />
                                    {(preview !== '') && <span className="text-xs ">Change Image</span>}
                                    <AvatarFallback className="bg-transparent text-center text-sm rounded-sm w-full">
                                        Choose an Image
                                    </AvatarFallback>
                                </Avatar>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='tags' render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs text-teal-500">Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="Tags" {...field} className="" defaultValue={product?.tags?.toString()} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className="flex justify-center ">
                    <LoadingButton type="submit" loading={loading} className='bg-teal-600'>
                        Update Info
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}

export default EditProduct;
