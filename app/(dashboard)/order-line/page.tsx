import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AddProduct from '@/components/forms/addproduct'
import { getManyProducts, getProductsinCart } from '@/actions/productController'
import { getBusiness } from '@/actions/businessController'
import { CheckoutContextProvider } from '@/context/usecheckout'
import CheckoutCart from '@/components/cards/checkoutcart'
import { SearchContextProvider } from '@/context/usesearch'
import SearchForm from '@/components/forms/searchform'
import OrderList from '@/components/cards/orderlist'
import { findActiveSale } from '@/actions/salesController'
import Link from 'next/link'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active')
        return redirect('/settings')
    const productsincart =
        (await getProductsinCart(session?.user.activeLocation as string)) ?? []
    const products = (await getManyProducts(business.id)) ?? []
    const location = session?.user.activeLocation as string
    const activesale = await findActiveSale(location)
    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <div className="flex justify-between items-center gap-8 py-4">
                    <div className="md:w-8/12 lg:w-9/12">
                        <SearchForm />
                    </div>
                    <Link
                        className="bg-teal-500 hover:bg-teal-400 text-white text-sm text-center font-mono border rounded-lg px-4 py-2"
                        href={'/products/add-product'}
                    >
                        Add Product
                    </Link>
                </div>
                <div className="page-body md:flex gap-3">
                    <CheckoutContextProvider
                        productsInCart={productsincart}
                        fullproducts={products}
                        businessLocationId={
                            session?.user.activeLocation as string
                        }
                    >
                        <div className="md:order-last md:w-4/12 lg:w-3/12">
                            <CheckoutCart
                                activeSale={activesale}
                                locationId={location}
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:w-8/12 lg:w-9/12 transition-all">
                            <OrderList
                                locationId={location}
                                products={products}
                                checkoutitems={productsincart}
                            />
                        </div>
                    </CheckoutContextProvider>
                </div>
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage
