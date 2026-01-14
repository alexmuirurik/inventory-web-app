import React from 'react'
import { getBusiness } from '@/src/actions/businessController'
import {
    getManyProducts,
    getProductById,
} from '@/src/actions/productController'
import { auth } from '@/auth'
import PageHeader from '@/src/components/layouts/PageHeader'
import { notFound, redirect } from 'next/navigation'
import { SearchContextProvider } from '@/src/context/usesearch'
import { getManyOrderLines } from '@/src/actions/orderLineController'
import SearchForm from '@/src/components/forms/search-form'
import { getManySales, getProductSales } from '@/src/actions/salesController'
import SalesCard from '@/src/components/cards/sales-card'

const SingleProductPage = async ({
    params,
}: {
    params: Promise<{ product: string }>
}) => {
    const { product: productId } = await params
    const session = await auth()
    const business = await getBusiness(session?.user?.id)
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    if (!businessLocation) return redirect('/settings')
    const product = (await getProductById(productId)) ?? undefined
    if (!product) return notFound()
    const sales = (await getProductSales(product.id)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title={product.name}
                    description={String(sales.length)}
                >
                    <SearchForm />
                </PageHeader>
                <SalesCard sales={sales} />
            </SearchContextProvider>
        </div>
    )
}

export default SingleProductPage
