import ProductsCard from '../cards/productscard'
import { CompleteProduct } from '@/prisma/types'

const ProductList = ({ products }: { products: CompleteProduct[] }) => {
    return (
        <div className="page-body space-y-1">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border border-neutral-300 p-2">
                <div className="flex items-center gap-1 w-1/4 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Product</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">In Stock</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Category</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer border-e border-neutral-300 px-2">
                    <span className="">Sold</span>
                </div>
                <div className="flex items-center gap-1 w-2/12 cursor-pointer px-2">
                    <span className="">Revenue</span>
                </div>
            </div>
            <ProductsCard products={products} />
        </div>
    )
}

export default ProductList
