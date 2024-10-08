'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useCheckoutContext } from '@/context/usecheckout';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { LoadingButton } from '../ui/loadingbutton';
import { CiMobile3 } from "react-icons/ci";
import { HiCurrencyDollar } from "react-icons/hi2";
import { ImSpinner10 } from "react-icons/im";
import CheckoutItemsCard from './checkoutitemscard';

interface CheckoutItems {
    checkoutItems: CheckoutitemswithProducts[],
    locationId: string,
    fullProducts: ProductWithCategoriesBrandsAndStock[]
}

const CheckoutCart = ({ checkoutItems, locationId, fullProducts }: CheckoutItems) => {
    const [loading, setLoading] = useState(false)
    const [activeButton, setActiveButton] = useState('')
    const { addingToCart, setAddingToCart, products, removeProductId } = useCheckoutContext()
    return (
        <Card className='bg-transparent p-0'>
            <div className='flex items-center justify-between w-full px-3 py-2'>
                <CardTitle className='text-sm'>Order Product</CardTitle>
                {addingToCart && <span className='text-teal-600'><ImSpinner10 className='animate-spin' /></span>}
            </div>
            <CardContent className='p-3 space-y-3'>
                <CheckoutItemsCard fullproducts={fullProducts} />
            </CardContent>
            <CardHeader className='px-3 py-2'>
                <CardTitle className='text-sm'>Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className='p-0 flex-col space-y-4'>
                <div className=" w-full p-2 space-y-2">
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Selling Price SubTotal</span>
                        <span className='text-sm font-bold'>
                            ${products.reduce((prev, curr) => {
                                return prev + (curr.count * curr.sellingPrice)
                            }, 0)}.00
                        </span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Tax Total</span>
                        <span className='text-sm font-bold'>${0}.00</span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Profit</span>
                        <span className='text-sm font-bold'>
                            ${products.reduce((prev, curr) => {
                                return prev + ((curr.sellingPrice - curr.buyingPrice) * curr.count)
                            }, 0)}.00
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardHeader className='px-3 py-2'>
                <CardTitle className='text-sm'>Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className='p-0 flex-col '>
                <div className="space-y-2 px-2 w-full">
                    <div className="flex items-center justify-between gap-2 py-3">
                        <div className='flex flex-col items-center w-full '>
                           <HiCurrencyDollar className='hover:bg-teal-200 text-teal-600 border w-full h-10 px-8 py-2 cursor-pointer' /> 
                           <span className='text-sm font-medium'>Cash</span>
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <CiMobile3 className='hover:bg-teal-200 text-teal-600 border w-full h-10 px-8 py-2 cursor-pointer' />
                            <span className='text-sm font-medium'>Mobile</span>
                        </div>
                    </div>
                </div>
                <div className="flex p-3 pt-0 w-full">
                    <LoadingButton loading={loading} className='bg-teal-500 hover:bg-teal-400 w-full'>
                        Complete Order
                    </LoadingButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default CheckoutCart;
