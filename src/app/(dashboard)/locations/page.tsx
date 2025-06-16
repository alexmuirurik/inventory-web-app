import React from 'react'
import PageHeader from '@/src/components/layouts/PageHeader'
import { auth } from '@/auth'
import { getBusiness } from '@/src/actions/businessController'
import { redirect } from 'next/navigation'
import { getManyLocations } from '@/src/actions/locationController'

const LocationsPage = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if (!business || business.subscription !== 'active')
        return redirect('/settings')
    const locations = (await getManyLocations(business.id)) ?? []
    return (
        <div className="page-wrapper">
            <PageHeader
                title="Locations"
                description={String(locations.length)}
            >
                <input
                    type="text"
                    className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2"
                    placeholder="Search"
                />
            </PageHeader>
            <div className="page-body"></div>
        </div>
    )
}

export default LocationsPage
