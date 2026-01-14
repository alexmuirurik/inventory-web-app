import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getManyProducts } from '@/src/actions/productController'
import { getBusiness } from '@/src/actions/businessController'
import { SearchContextProvider } from '@/src/context/usesearch'
import PageHeader from '@/src/components/layouts/PageHeader'
import SearchForm from '@/src/components/forms/search-form'
import AddSaleReport from '@/src/components/forms/add-sale-report'
import { getManySales } from '@/src/actions/salesController'
import SalesCard from '@/src/components/cards/sales-card'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id ?? '')
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const products = (await getManyProducts(businessLocation?.id)) ?? []
    const sales = (await getManySales(businessLocation?.id as string)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title="Sales Report"
                    description={String(sales.length)}
                >
                    <SearchForm />
                    <AddSaleReport
                        products={products}
                        businessLocation={businessLocation}
                    />
                </PageHeader>
                <SalesCard sales={sales} />
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
