import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import { getManyBrands } from '@/actions/brandController';
import AddBrand from '@/components/forms/addbrand';
import BrandsCard from '@/components/cards/brandscard';

const BrandsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const brands = await getManyBrands(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Brands' description={String(brands?.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddBrand business={business} />
            </PageHeader>
            <div className="page-body grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                <BrandsCard brands={brands.sort((a, b) => a.name.localeCompare(b.name) )} />
            </div>
        </div>
    );
}

export default BrandsPage;
