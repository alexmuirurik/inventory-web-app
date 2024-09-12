import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import ProductsCard from '@/components/cards/productscard';
import { getManyProducts } from '@/actions/productController';
import AddProduct from '@/components/forms/addproduct';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';

const SalesPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business) return redirect('/settings')
    const products = await getManyProducts() ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Sales' description={String(products.length)} >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <AddProduct />
                </div>
            </PageHeader>
            <div className="page-body">
                <ProductsCard products={products} />
            </div>
        </div>
    );
}

export default SalesPage;
