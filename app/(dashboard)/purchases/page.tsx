import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import ProductsCard from '@/components/cards/productscard';
import { getManyProducts } from '@/actions/productController';
import AddProduct from '@/components/forms/addproduct';

const PurchasesPage = async () => {
    const products = await getManyProducts() ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Inventory' description={String(products.length)} >
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

export default PurchasesPage;
