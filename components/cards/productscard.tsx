'use client'
import React, { useRef, useState } from 'react';
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { useCheckoutContext } from '@/context/usecheckout';
import Link from 'next/link';

const ProductsCard = ({ products }: { products: ProductWithCategoriesBrandsAndStock[] }) => {
    return products.map(product => {
        const productsinstock = product.productInStock?.reduce((prev, curr) => { return prev + curr.count }, 0)
        return <Card className={'bg-transparent p-0 overflow-hidden '}>
            <div className="flex image-box h-40 max-h-52 overflow-clip">
                <Image className='!static w-fit h-full' src={'/uploads/1.jpg'} alt='' fill />
            </div>
            <CardContent className={' w-fill border-b p-3 overflow-hidden '}>
                <Link href={'/products/' + product.id } className='hover:text-teal-900 text-sm font-bold text-gray-800 text-nowrap'>
                    {product.name}
                </Link>
                <p className='flex items-center gap-2 text-sm font-medium text-gray-500'>
                    <span className={'text-xs ' + (productsinstock > 0) ? 'text-teal-600' : 'text-red-600'}>
                        {productsinstock > 0 ? productsinstock + ' in stock' : 'Out of Stock'}
                    </span>
                </p>
            </CardContent>
        </Card>
    })
}

export default ProductsCard;
