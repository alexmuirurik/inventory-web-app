'use client'
import React, { useRef, useState } from 'react';
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useCheckoutContext } from '@/context/usecheckout';

const ProductsCard = ({ product }: { product: ProductWithCategoriesBrandsAndStock }) => { 
    const [active, setActive] = useState('')
    const count = useRef(0)
    const { setProductId, removeProductId } = useCheckoutContext()
    const productsinstock = product.productInStock?.reduce((prev, curr) => { return prev + curr.count }, 0)
    const onCount = async (action: string) => {
        if (action === 'plus' && count.current < productsinstock) {
            count.current++
            return setProductId(product.id, count.current)
        } else if (action ==='minus' && count.current > 0) { 
            count.current--
            if (count.current < 1) {
                return removeProductId(product.id)
            } else {
                return setProductId(product.id, count.current)
            }
        }
        (count.current > 0) ? setActive('border-teal-500') : setActive('')
    }
    return <Card className={'bg-transparent p-0 overflow-hidden ' + active}>
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
    </Card>
}

export default ProductsCard;
