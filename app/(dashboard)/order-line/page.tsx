import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AddProduct from '@/components/forms/addproduct'
import { getManyProducts, getProductsinCart } from '@/actions/productController'
import { getBusiness } from '@/actions/businessController'
import { getManyCategories } from '@/actions/categoryController'
import { getManyBrands } from '@/actions/brandController'
import { CheckoutContextProvider } from '@/context/usecheckout'
import CheckoutCart from '@/components/cards/checkoutcart'
import { SearchContextProvider } from '@/context/usesearch'
import SearchForm from '@/components/forms/searchform'
import OrderList from '@/components/cards/orderlist'

const OrderLinePage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const productsincart = await getProductsinCart(session?.user.activeLocation as string) ?? []
    const products = await getManyProducts(business.id) ?? []
    const categories = await getManyCategories(business.id) ?? []
    const brands = await getManyBrands(business.id) ?? []
    const location = session?.user.activeLocation as string
    return (
        <div className="page-wrapper">
            <SearchContextProvider>
                <PageHeader title='Order Line' description={String(productsincart.length)} >
                    <SearchForm />
                    <AddProduct business={business} brands={brands} categories={categories} />
                </PageHeader>
                <div className="page-body md:flex gap-3">
                    <CheckoutContextProvider productsInCart={productsincart} fullproducts={products} businessLocationId={session?.user.activeLocation as string} >
                        <div className="md:order-last md:w-4/12 lg:w-3/12">
                            <CheckoutCart checkoutItems={productsincart} locationId={session?.user.activeLocation as string} fullProducts={products} />
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 md:w-8/12 lg:w-9/12 transition-all">
                            <OrderList locationId={location} products={products} checkoutitems={productsincart} />
                        </div>
                    </CheckoutContextProvider>
                </div> 
            </SearchContextProvider>
        </div>
    )
}

export default OrderLinePage