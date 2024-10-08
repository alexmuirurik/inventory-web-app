import React from 'react';
import PageHeader from '@/components/layouts/PageHeader';
import AddProduct from '@/components/forms/addproduct';
import { auth } from '@/auth';
import { getBusiness } from '@/actions/businessController';
import { redirect } from 'next/navigation';
import { getManyLocations } from '@/actions/locationController';
import LocationsCard from '@/components/cards/locationscard';
import AddLocation from '@/components/forms/addlocation';

const ReportsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
    const locations = await getManyLocations(business.id) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader title='Sales Reports' description={String(locations.length)} >
                <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                <AddLocation business={business} />
            </PageHeader>
            <div className="page-body">
                <LocationsCard locations={locations} />
            </div>
        </div>
    );
}

export default ReportsPage;
