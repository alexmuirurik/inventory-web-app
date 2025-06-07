import React from 'react'
import { FaSort } from 'react-icons/fa'
import ProductsCard from '../cards/productscard'
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types'

const ProductList = ({
    products,
}: {
    products: ProductWithCategoriesBrandsAndStock[]
}) => {
    return (
        <div className="page-body space-y-1">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border border-neutral-300 p-2">
                <div className="flex items-center gap-1 w-1/4 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Products</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Category</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Price</span>
                    <FaSort className="text-xs text-neutral-500" />
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Stock</span>
                    <FaSort className="text-xs text-neutral-500" />
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer px-2">
                    <span className="">Sold</span>
                    <FaSort className="text-xs text-neutral-500" />
                </div>
            </div>
            <ProductsCard products={products} />
        </div>
    )
}

export default ProductList
