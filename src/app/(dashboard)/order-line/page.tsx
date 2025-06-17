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

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id ?? '')
    if (!business) return redirect('/settings')
    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const products = (await getManyProducts(businessLocation?.id ?? '')) ?? []
    const orderLineItems = (await getManyOrderLines()) ?? []

    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader title="Order Line" description={' products'}>
                    <SearchForm />
                    <OrderLineActions businessLocation={businessLocation} products={products} />
                </PageHeader>
                <div className="page-body space-y-2">
                    <div className="flex justify-between items-center border border-neutral-300 w-full">
                        <div className=" rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Day
                            </span>
                        </div>
                        <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Supplies
                            </span>
                        </div>
                        <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Sales
                            </span>
                        </div>
                        <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Loses
                            </span>
                        </div>
                        <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Petty Cash
                            </span>
                        </div>
                        <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                            <span className="text-neutral-600 font-bold">
                                Miscellaneous
                            </span>
                        </div>
                    </div>
                    <OrderLineCard orderLine={orderLineItems} />
                </div>
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
