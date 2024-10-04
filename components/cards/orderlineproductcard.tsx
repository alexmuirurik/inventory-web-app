'use client'
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCheckoutContext } from '@/context/usecheckout';
import { CheckoutitemswithProducts, productInStockAndProductAndPurchase, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { updateProductinCart } from '@/actions/salesController';

const OrderLineProductsCard = ({ locationId, product, checkoutitem }: { 
    locationId: string,
    product: ProductWithCategoriesBrandsAndStock, 
    checkoutitem: CheckoutitemswithProducts 
}) => { 
    const [active, setActive] = useState('')
    const count = useRef(0)
    const { products, setProductId, removeProductId } = useCheckoutContext()
    const productsinstock = product.productInStock.find(stock => stock.businessLocationId === locationId)?.count ?? 0
    const onCount = async (action: string) => {
        if (action === 'plus' && count.current < productsinstock) {
            count.current++
            const updateproduct = await updateProductinCart(checkoutitem.id, count.current, 'unpaid')
            return setProductId(checkoutitem.product.id, count.current)
        } else if (action ==='minus' && count.current > 0) { 
            count.current--
            if (count.current < 1) {
                return removeProductId(checkoutitem.product.id)
            } else {
                const updateproduct = await updateProductinCart(checkoutitem.id, count.current, 'unpaid')
                return setProductId(checkoutitem.product.id, count.current)
            }
        }
        (count.current > 0) ? setActive('border-teal-500') : setActive('')
    }
    return <Card className={'bg-transparent h-fit p-0 overflow-hidden ' + active}>
        <div className="flex image-box h-40 max-h-52 overflow-clip">
            <Image className='!static w-fit h-full' src={'/uploads/1.jpg'} alt='' fill />
        </div>
        <CardContent className={' w-fill border-b p-3 overflow-hidden '}>
            <p className='text-sm font-bold text-gray-800 text-nowrap'>{checkoutitem.product.name }</p>
            <p className='flex items-center gap-2 text-sm font-medium text-gray-500'>
                <span className={'text-xs ' + (productsinstock > 0) ? 'text-teal-600' : 'text-red-600'}>
                    {productsinstock > 0 ? productsinstock + ' in stock' : 'Out of Stock'}
                </span>
            </p>
        </CardContent>
        <CardFooter className='flex justify-between items-center select-none px-3 py-2' >
            <p className='text-lg text-teal-700 font-bold cursor-text'>${ productsinstock ?? 0}</p>
            <div className="flex items-center gap-2">
                <Minus className='bg-gray-300 text-gray-700 h-4 w-4 p-0.5 cursor-pointer' onClick={() => onCount('minus')} />
                <span className='text-teal-500 font-bold'>{count.current}</span>
                <Plus className='bg-teal-500 text-gray-700 w-4 h-4 p-0.5 cursor-pointer' onClick={() => onCount('plus')} />
            </div>
        </CardFooter>
    </Card>
}

export default OrderLineProductsCard;
