import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import ProductsCard from '@/components/cards/productscard';
import { getManyProducts } from '@/actions/productController';
import AddProduct from '@/components/forms/addproduct';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import { getManyCategories } from '@/actions/categoryController';
import { getManyBrands } from '@/actions/brandController';

const ProductsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const products = await getManyProducts(business.id) ?? []
    const categories = await getManyCategories(business.id) ?? []
    const brands     = await getManyBrands(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Products' description={String(products.length)} >
                <input type="text" className="bg-transparent hidden md:block focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddProduct business={business} categories={categories} brands={brands} />
            </PageHeader>
            <div className="page-body grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <ProductsCard products={products} />
            </div>
        </div>
    );
}

export default ProductsPage;
