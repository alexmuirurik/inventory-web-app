'use client'

import { CompleteProduct } from '@/prisma/types'
import Link from 'next/link'

const ProductsCard = ({ products }: { products: CompleteProduct[] }) => {
    return products.map((product, i) => {
        return (
            <div
                key={product.id}
                className="flex justify-between items-center gap-2 border p-2"
            >
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none px-2">
                    <Link
                        href={`/products/${product.id}`}
                        className="text-sm text-neutral-600 font-bold"
                    >
                        {product.name}
                    </Link>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">
                        {product.stocks.at(0)?.itemsCount} {product.units}
                    </span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">{product.category?.name}</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">{product.saleItems.reduce((acc, saleItem) => {
                        return acc + saleItem.itemsCount
                    }, 0)}</span>
                </div>
                <div className="px-2 w-2/12">
                    <span className="text-sm">{product.saleItems.reduce((acc, saleItem) => {
                        return acc + saleItem.sellingPrice
                    }, 0).toFixed(2)} Ksh</span>
                </div>
            </div>
        )
    })
}

export default ProductsCard
