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
import {
    getManyOrderLines,
    getOrderLineById,
} from '@/src/actions/orderLineController'
import SearchForm from '@/src/components/forms/search-form'
import OrderLineActions from '@/src/components/forms/order-line-actions'
import ProductSalesCard from '@/src/components/cards/product-sales-card'
import SingleOrderLineCard from '@/src/components/cards/single-order-line-card'

const SingleOrdelinePage = async ({
    params,
}: {
    params: Promise<{ orderLine: string }>
}) => {
    const { orderLine: orderLineId } = await params
    const session = await auth()
    const business = await getBusiness(session?.user?.id)
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const orderLine = await getOrderLineById(orderLineId)
    if (!orderLine) return notFound()
    const products = (await getManyProducts(businessLocation?.id)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title={orderLine?.date}
                    description={String(orderLine.supplies.length)}
                >
                    <SearchForm />
                    <OrderLineActions
                        businessLocation={businessLocation}
                        products={products}
                    />
                </PageHeader>
                <SingleOrderLineCard
                    products={products}
                    orderLine={orderLine}
                />
            </SearchContextProvider>
        </div>
    )
}

export default SingleOrdelinePage
