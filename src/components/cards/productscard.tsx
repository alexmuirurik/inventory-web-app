'use client'

import { CompleteProduct } from '@/prisma/types'
import Link from 'next/link'

const ProductsCard = ({ products }: { products: CompleteProduct[] }) => {
    return products.map((product, i) => {
        const stock = 0
        const sales = 0
        const revenue = 0
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
                        {stock - sales} {product.units}
                    </span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">{product.category?.name}</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">{sales}</span>
                </div>
                <div className="px-2 w-2/12">
                    <span className="text-sm">{revenue.toFixed(2)} Ksh</span>
                </div>
            </div>
        )
    })
}

export default ProductsCard
