'use client'
import React from 'react'
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types'
import Image from 'next/image'

const ProductsCard = ({
    products,
}: {
    products: ProductWithCategoriesBrandsAndStock[]
}) => {
    return products.map((product) => {
        const productsinstock = product.productInStock?.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)
        return (
            <div className="flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer px-2">
                    <Image
                        className="!static border h-8 w-12"
                        src={product.image ?? '/uploads/1.jpg'}
                        alt=""
                        width={6}
                        height={6}
                    />
                    <span className='text-sm font-bold'>{product.name}</span>
                </div>
                <div className="px-2 w-2/12 ">
                    <span className="text-sm font-semibold">{product.categoryId}</span>
                </div>
                <div className="px-2 w-3/12 ">
                    <span className="text-sm">
                        {productsinstock > 0
                            ? productsinstock + ' in stock'
                            : 'Out of Stock'}
                    </span>
                </div>
                <div className="px-2 w-2/12 ">
                    <span className="text-sm">{product.sellingPrice}</span>
                </div>
                <div className="px-2 w-1/12 text-end">
                    <span className="bg-slate-400 text-white text-xs py-1 px-2 cursor-pointer">{product.status}</span>
                </div>
            </div>
        )
    })
}

export default ProductsCard
