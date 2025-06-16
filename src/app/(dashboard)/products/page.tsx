import React from 'react'
import PageHeader from '@/src/components/layouts/PageHeader'
import { getManyProducts } from '@/src/actions/productController'
import { auth } from '@/auth'
import { getBusiness } from '@/src/actions/businessController'
import { redirect } from 'next/navigation'
import ProductList from '@/src/components/lists/product-list'
import AddProduct from '@/src/components/forms/add-product'
import SearchForm from '@/src/components/forms/search-form'
import { getManyCategories } from '@/src/actions/categoryController'

const ProductsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')

    const businessLocation = business.locations.find(
        (location) => location.id === session?.user.activeLocation
    )
    const products =
        (await getManyProducts(businessLocation?.id as string)) ?? []
    const categories =
        (await getManyCategories(businessLocation?.id as string)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title="Products" description={String(products.length)}>
                <SearchForm />
                <AddProduct
                    categories={categories}
                    businessLocation={businessLocation}
                />
            </PageHeader>
            <ProductList products={products} />
        </div>
    )
}

export default ProductsPage
