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
import OrderLineActions from '@/src/components/forms/order-line-actions'
import ProductSalesCard from '@/src/components/cards/product-sales-card'

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
    const product = (await getProductById(productId)) ?? undefined
    if (!product) return notFound()
    const orderLineItems = (await getManyOrderLines(businessLocation?.id)) ?? []
    const products = (await getManyProducts(businessLocation?.id)) ?? []
    const newOrderLineItems = orderLineItems.map((orderline) => {
        return {
            ...orderline,
            sales: orderline.sales.filter(
                (sale) => sale.productId === product.id
            ),
            supplies: orderline.supplies.filter(
                (supply) => supply.productId === product.id
            ),
        }
    })

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title={product.name}
                    description={String(orderLineItems.length)}
                >
                    <SearchForm />
                    <OrderLineActions
                        businessLocation={businessLocation}
                        products={products}
                    />
                </PageHeader>
                <ProductSalesCard orderLines={newOrderLineItems} />
            </SearchContextProvider>
        </div>
    )
}

export default SingleProductPage
