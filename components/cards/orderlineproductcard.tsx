'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCheckoutContext } from '@/context/usecheckout';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { addProductToCart, removeProductFromCart, updateProductinCart } from '@/actions/salesController';
import { useRouter } from 'next/navigation';
interface OrderLineProducts { 
    locationId: string,
    product: ProductWithCategoriesBrandsAndStock, 
    checkoutitem: CheckoutitemswithProducts | undefined
}

const OrderLineProductsCard = ({ locationId, product, checkoutitem }: OrderLineProducts ) => { 
    const [active, setActive] = useState((checkoutitem?.count ?? 0 > 0) && 'border-teal-500' )
    const count = useRef(checkoutitem?.count ?? 0)
    const { setAddingToCart, setProductId, removeProductId } = useCheckoutContext()
    const router = useRouter()
    const productsinstock = product.productInStock.find(stock => stock.businessLocationId === locationId)?.count ?? 0
    const onCount = async (action: string) => {
        if (action === 'plus' && count.current < productsinstock) {
            setAddingToCart(true)
            count.current++
            const addtocart = await addProductToCart(locationId, product.id, count.current)
            setProductId(product.id, count.current)
            router.refresh()
            setAddingToCart(false)
        } else if (action ==='minus' && count.current > 0) { 
            if(!checkoutitem) return
            count.current--
            if (count.current < 1) {
                setAddingToCart(true)
                removeProductId(checkoutitem.product.id)
                const removedproduct = await removeProductFromCart(checkoutitem.id)
                setAddingToCart(false)
            } else {
                setAddingToCart(true)
                const updateproduct = await updateProductinCart(checkoutitem?.id, count.current, 'unpaid')
                setProductId(checkoutitem.product.id, count.current)
                router.refresh()
                setAddingToCart(false)
            }
        }
        (count.current > 0) ? setActive('border-teal-500') : setActive('')
    }

    return <Card className={'bg-transparent h-fit p-0 overflow-hidden ' + active}>
        <div className="flex image-box h-40 max-h-52 overflow-clip">
            <Image className='!static w-fit h-full' src={'/uploads/1.jpg'} alt='' fill />
        </div>
        <CardContent className={' w-fill border-b p-3 overflow-hidden '}>
            <p className='text-sm font-bold text-gray-800 text-nowrap'>{product.name }</p>
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
