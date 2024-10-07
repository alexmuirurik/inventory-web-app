import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { getManyProducts, getProductsInStock } from '@/actions/productController';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import StocksCard from '@/components/cards/stockscard';
import { getLocationById, getManyLocations } from '@/actions/locationController';

const InventoryPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const businessLocation = await getLocationById(session?.user.activeLocation as string)
    const products = await getManyProducts(business.id) ?? []
    const productsInStock = await getProductsInStock(businessLocation?.id as string) ?? []
    const businessLocations = await getManyLocations(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Inventory' description={String(productsInStock.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                
            </PageHeader>
            <div className="page-body">
                <StocksCard products={productsInStock} />
            </div>
        </div>
    );
}

export default InventoryPage;
