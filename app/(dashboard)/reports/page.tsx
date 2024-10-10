import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import AddLocation from '@/components/forms/addlocation';
import SalesCard from '@/components/cards/salescard';
import { getManySales } from '@/actions/salesController';

const ReportsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const sales = await getManySales(session?.user.activeLocation as string) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Sales Reports' description={String(sales.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddLocation business={business} />
            </PageHeader>
            <div className="page-body">
                <SalesCard sales={sales} />
            </div>
        </div>
    );
}

export default ReportsPage;
