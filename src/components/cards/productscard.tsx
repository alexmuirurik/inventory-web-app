'use client'
import React from 'react'
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types'
const ProductsCard = ({
    products,
}: {
    products: ProductWithCategoriesBrandsAndStock[]
}) => {
    return products.map((product, i) => (
        <div
            key={product.id}
            className="flex justify-between items-center gap-2 border p-2"
        >
            <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none px-2">
                <span className="text-sm text-neutral-600 font-bold">
                    {product.name}
                </span>
            </div>
            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                <span className="text-sm text-neutral-400">
                    {product.createdAt.getDate()}
                </span>
            </div>
            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                <span className="text-sm">{product.buyingPrice}</span>
            </div>
            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                <span className="text-sm">{product.sellingPrice}</span>
            </div>
            <div className="px-2 w-2/12">
                <span className="text-sm">{product.buyingPrice}</span>
            </div>
        </div>
    ))
}

export default ProductsCard
