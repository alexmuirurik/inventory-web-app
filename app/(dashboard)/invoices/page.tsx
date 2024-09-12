import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { auth } from '@/auth'
import AddProduct from '@/components/forms/addproduct'
import ProductsCard from '@/components/cards/productscard'
import { getManyProducts } from '@/actions/productController'
import { getBusiness } from '@/actions/businessController'
import { redirect } from 'next/navigation'

const Invoices = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business) return redirect('/settings')
    const products = await getManyProducts() ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Invoices' description='540+' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <AddProduct />
                </div>
            </PageHeader>
            <div className="page-body">
                <ProductsCard products={products} />
            </div>
        </div>
    )
}

export default Invoices