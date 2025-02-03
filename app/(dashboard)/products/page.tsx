import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import ProductsCard from '@/components/cards/productscard'
import { getManyProducts } from '@/actions/productController'
import { auth } from '@/auth'
import { getBusiness } from '@/actions/businessController'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaSort } from 'react-icons/fa'

const ProductsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active')
        return redirect('/settings')
    const products = (await getManyProducts(business.id)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title="Products" description={String(products.length)}>
                <input
                    type="text"
                    className="bg-transparent hidden md:block focus-within:!ring-0 border text-sm ps-5 py-2"
                    placeholder="Search"
                />
                <Link
                    className="bg-teal-500 hover:bg-teal-400 text-white text-sm text-center font-mono border rounded-lg px-4 py-2"
                    href={'/products/add-product'}
                >
                    Add Product
                </Link>
            </PageHeader>
            <div className="page-body space-y-1">
                <div className="bg-neutral-200 flex justify-between items-center gap-2 p-2">
                    <div className="flex items-center gap-1 w-1/4 cursor-pointer px-2">
                        <span className="">
                            Products
                        </span>
                        <FaSort className='text-xs' />
                    </div>
                    <div className="flex items-center gap-1 w-2/12 cursor-pointer px-2">
                        <span className="">
                            Category
                        </span>
                        <FaSort className='text-xs' />
                    </div>
                    <div className="flex items-center gap-1 w-3/12 cursor-pointer px-2">
                        <span className="">
                            Inventory
                        </span>
                        <FaSort className='text-xs' />
                    </div>
                    <div className="flex items-center gap-1 w-2/12 cursor-pointer px-2">
                        <span className="">
                            Price
                        </span>
                        <FaSort className='text-xs' />
                    </div>
                    <div className="flex items-center gap-1 w-1/12 justify-end cursor-pointer px-2">
                        <span className="">
                            Status
                        </span>
                        <FaSort className='text-xs' />
                    </div>
                </div>
                <ProductsCard products={products} />
            </div>
        </div>
    )
}

export default ProductsPage
