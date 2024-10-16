'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCheckoutContext } from '@/context/usecheckout';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { LoadingButton } from '../ui/loadingbutton';
import { CiMobile3 } from "react-icons/ci";
import { HiCurrencyDollar } from "react-icons/hi2";
import { ImSpinner10 } from "react-icons/im";
import CheckoutItemsCard from './checkoutitemscard';
import { useToast } from '../ui/use-toast';
import { completeSale } from '@/actions/salesController';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';

interface CheckoutItems {
    checkoutItems: CheckoutitemswithProducts[],
    locationId: string,
    fullProducts: ProductWithCategoriesBrandsAndStock[]
}

const CheckoutCart = ({ checkoutItems, locationId, fullProducts }: CheckoutItems) => {
    const [activePayMethod, setActivePayMethod] = useState('')
    const [customerName, setCustomerName] = useState('Random Customer')
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const router = useRouter()
    const { addingToCart, products, removeProductId, completeCheckoutOrder } = useCheckoutContext()
    const totalsellingPrice = products.reduce((prev, curr) => {return prev + (curr.count * curr.sellingPrice) }, 0)
    const totalprofit = products.reduce((prev, curr) => { return prev + ((curr.sellingPrice - curr.buyingPrice) * curr.count) }, 0)
    const handleCompleteOrder = async () => {
        if(activePayMethod === '') return toast({ description: 'Choose Payment Method First', variant: 'destructive' })
        if(customerName === '') return toast({ description: 'We Need a Customer Name', variant: 'destructive' })
        setLoading(true)
        const completedsale = await completeSale(locationId, checkoutItems, totalsellingPrice, totalsellingPrice)
        if(completedsale) {
            completeCheckoutOrder()
            router.refresh()
            toast({
                title: 'Success',
                description: 'We\'ve successfully added the sale',
                variant: 'success'
            })
        }else {
            toast({
                title: 'Failed',
                description: 'We failed to add the sale',
                variant: 'destructive'
            })   
        }
        setLoading(false)
    }
    return (
        <Card className='bg-transparent p-0'>
            <div className='flex items-center justify-between w-full px-3 py-2'>
                <CardTitle className='text-sm'>Customer Name</CardTitle>
                {addingToCart && <span className='text-teal-600'><ImSpinner10 className='animate-spin' /></span>}
            </div>
            <CardContent className='px-3 pb-0 space-y-3'> 
                <Input className='text-xs w-full' placeholder='Customer Name' defaultValue={customerName} onChange={(e) => setCustomerName(e.currentTarget.value)} />
            </CardContent>
            <div className='flex items-center justify-between w-full px-3 py-2'>
                <CardTitle className='text-sm'>Order Product</CardTitle>
            </div>
            <CardContent className='px-3 space-y-3'>
                <CheckoutItemsCard checkoutitems={checkoutItems} fullproducts={fullProducts} />
            </CardContent>
            <CardHeader className='px-3 py-2'>
                <CardTitle className='text-sm'>Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className='p-0 flex-col space-y-4'>
                <div className=" w-full p-2 space-y-2">
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Selling Price SubTotal</span>
                        <span className='text-sm font-bold'>
                            ${totalsellingPrice}.00
                        </span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Tax Total</span>
                        <span className='text-sm font-bold'>${0}.00</span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className='text-xs'>Profit</span>
                        <span className='text-sm font-bold'>
                            ${totalprofit}.00
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardHeader className='px-3 py-2'>
                <CardTitle className='text-sm'>Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className='p-0 flex-col '>
                <div className="space-y-2 px-2 w-full py-3">
                    <div className="flex items-center justify-between gap-2 ">
                        <div className='flex flex-col items-center w-full space-y-1' onClick={() => setActivePayMethod('cash')}>
                            <HiCurrencyDollar className={
                                ((activePayMethod === 'cash') ? 'bg-teal-300 ' : 'hover:bg-teal-100 ') +
                                ' text-teal-600 border w-full h-10 px-8 py-2 cursor-pointer'
                            } />
                            <span className='text-xs font-medium'>Cash</span>
                        </div>
                        <div className="flex flex-col items-center w-full space-y-1" onClick={() => setActivePayMethod('mobile')}>
                            <CiMobile3 className={
                                ((activePayMethod === 'mobile') ? 'bg-teal-300 ' : 'hover:bg-teal-100 ') +
                                ' text-teal-600 border w-full h-10 px-8 py-2 cursor-pointer'
                            } />
                            <span className='text-xs font-medium'>Mobile</span>
                        </div>
                    </div>
                    {(activePayMethod === 'mobile') && <Input className='text-xs w-full' placeholder='Mobile Number 2547...' />}
                </div>
                <div className="flex p-3 pt-0 w-full">
                    <LoadingButton loading={loading} className='bg-teal-500 hover:bg-teal-400 w-full' onClick={() => handleCompleteOrder()} >
                        Complete Order
                    </LoadingButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default CheckoutCart;
