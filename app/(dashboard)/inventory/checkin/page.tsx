import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import { getManyBrands } from '@/actions/brandController';
import AddProduct from '@/components/forms/addproduct';
import { getManyCategories } from '@/actions/categoryController';
import { ProductContentProvider } from '@/context/useproduct';
import { getPendingPurchase, getPurchaseItems } from '@/actions/checkoutController';
import { getUser } from '@/actions/userController';
import AddToCart from '@/components/forms/addtocart';
import CheckoutItems from '@/components/cards/checkoutitems';
import { getManyProducts } from '@/actions/productController';
import { getSuppliers } from '@/actions/supplierController';

const InventoryCheckInPage = async () => {
    const session = await auth()
    const user = await getUser(session?.user.id as string)
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const purchase = await getPendingPurchase(user?.activeLocation as string) 
    const checkoutitems = await getPurchaseItems(purchase?.id as string) ?? []
    const products      = await getManyProducts(business.id) ?? []
    const suppliers     = await getSuppliers(user?.activeLocation as string) ?? []
    const brands = await getManyBrands(business.id) ?? []
    const categories = await getManyCategories(business.id) ?? []
    
    return (
        <div className="page-wrapper">
            <PageHeader title='Check In Cart' description={String(checkoutitems?.length)} >
                <input className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search Product" />
                <AddProduct business={business} brands={brands} categories={categories} />
            </PageHeader>
            <div className="page-body md:flex gap-2">
                <ProductContentProvider>
                    <div className="order-2 md:order-1 md:w-7/12 lg:w-8/12 xl:w-9/12 md:h-[calc(100vh_-_10rem)] overflow-y-scroll">
                        <CheckoutItems checkoutitems={checkoutitems} />
                    </div>
                    <div className="order-1 md:order-2 md:w-5/12 lg:w-4/12 xl:w-3/12 overflow-y-scroll border p-3">
                        <AddToCart businessLocation={user?.activeLocation as string} products={products} suppliers={suppliers} />
                    </div>
                </ProductContentProvider>
            </div>
        </div>
    );
}

export default InventoryCheckInPage;
