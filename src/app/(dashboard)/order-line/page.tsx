import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getManyProducts } from '@/src/actions/productController'
import { getBusiness } from '@/src/actions/businessController'
import { SearchContextProvider } from '@/src/context/usesearch'
import PageHeader from '@/src/components/layouts/PageHeader'
import SearchForm from '@/src/components/forms/search-form'
import OrderLineActions from '@/src/components/forms/order-line-actions'
import OrderLineCard from '@/src/components/cards/order-line-card'
import { getManyOrderLines } from '@/src/actions/orderLineController'
import DashSalesList from '@/src/components/dash/dashsaleslist'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id ?? '')
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const products = (await getManyProducts(businessLocation?.id ?? '')) ?? []
    const orderLineItems =
        (await getManyOrderLines(businessLocation?.id as string)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title="Order Line"
                    description={String(orderLineItems.length)}
                >
                    <SearchForm />
                    <OrderLineActions
                        businessLocation={businessLocation}
                        products={products}
                    />
                </PageHeader>
                <DashSalesList orderLines={orderLineItems} />
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
