import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getManyProducts } from '@/src/actions/productController'
import { getBusiness } from '@/src/actions/businessController'
import { SearchContextProvider } from '@/src/context/usesearch'
import PageHeader from '@/src/components/layouts/PageHeader'
import SearchForm from '@/src/components/forms/search-form'
import OrderLineCard from '@/src/components/cards/order-line-card'
import AddStockReport from '@/src/components/forms/add-stock-report'
import { getManyOrderLines } from '@/src/actions/orderLineController'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id ?? '')
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    if (!businessLocation) return redirect('/settings')
    const products = (await getManyProducts(businessLocation?.id)) ?? []
    const orderLines = (await getManyOrderLines(businessLocation?.id)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title="Stock Report"
                    description={String(0)}
                >
                    <SearchForm />
                    <AddStockReport
                        products={products}
                        businessLocation={businessLocation}
                    />
                </PageHeader>
                <OrderLineCard orderLines={orderLines} />
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
