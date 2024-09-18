import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { getProductsInStock } from '@/actions/productController';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import AddInventory from '@/components/forms/addinventory';
import StocksCard from '@/components/cards/stockscard';

const InventoryPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')

    const products = await getProductsInStock(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Inventory' description={String(products.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddInventory business={business} />
            </PageHeader>
            <div className="page-body">
                <StocksCard products={products} />
            </div>
        </div>
    );
}

export default InventoryPage;
