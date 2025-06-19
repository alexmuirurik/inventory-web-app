'use client'

import { CompleteProduct } from '@/prisma/types'

const ProductsCard = ({ products }: { products: CompleteProduct[] }) => {
    return products.map((product, i) => {
        const stock = product.supplies.reduce(
            (prev, curr) => prev + curr.itemsCount,
            0
        )
        const sales = product.sales.reduce(
            (prev, curr) => prev + curr.itemsCount,
            0
        )
        const revenue = product.sales.reduce(
            (prev, curr) => prev + curr.itemsCount * curr.sellingPrice,
            0
        )
        return (
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
                        {stock - sales}
                    </span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">{product.category.name}</span>
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
