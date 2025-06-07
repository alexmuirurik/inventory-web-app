import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getManyProducts } from '@/src/actions/productController'
import { getBusiness } from '@/src/actions/businessController'
import { CheckoutContextProvider } from '@/src/context/usecheckout'
import { SearchContextProvider } from '@/src/context/usesearch'
import PageHeader from '@/src/components/layouts/PageHeader'
import SearchForm from '@/src/components/forms/search-form'
import OrderLineActions from '@/src/components/forms/order-line-actions'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active')
        return redirect('/settings')

    const products = (await getManyProducts(business.id)) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader
                    title="Order Line"
                    description={products.length + ' products'}
                >
                    <SearchForm />
                    <OrderLineActions />
                </PageHeader>
                <div className="page-body md:flex gap-2 ">
                    <CheckoutContextProvider>
                        <div className="md:w-8/12 lg:w-9/12 space-y-4">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 transition-all"></div>
                        </div>
                    </CheckoutContextProvider>
                </div>
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
