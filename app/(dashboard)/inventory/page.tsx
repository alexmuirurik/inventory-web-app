import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { getProductsInStock } from '@/actions/productController';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import AddInventory from '@/components/forms/addinventory';
import StocksCard from '@/components/cards/stockscard';
import Link from 'next/link';
import { LoadingButton } from '@/components/ui/loadingbutton';

const InventoryPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')

    const products = await getProductsInStock(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Inventory' description={String(products.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <LoadingButton variant="outline" asChild className='bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 font-mono font-bold'>
                    <Link href='/inventory/checkin'>
                        CheckIn Inventory
                    </Link>
                    
                </LoadingButton>
            </PageHeader>
            <div className="page-body">
                <StocksCard products={products} />
            </div>
        </div>
    );
}

export default InventoryPage;
