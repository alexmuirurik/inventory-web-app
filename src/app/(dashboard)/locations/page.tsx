import React from 'react'
import PageHeader from '@/src/components/layouts/PageHeader'
import { auth } from '@/auth'
import { getBusiness } from '@/src/actions/businessController'
import { redirect } from 'next/navigation'
import { getManyLocations } from '@/src/actions/locationController'

const LocationsPage = async () => {
    const session = await auth()
    if (!session) return redirect('/login')
    const business = await getBusiness(session?.user?.id as string)
    if (!business) return redirect('/settings')
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
            <div className="page-body">
                {locations.map((location) => (
                    <div key={location.id} className="border p-2">
                        <div className="flex justify-between items-center gap-8">
                            <div className="w-1/4 border-e border-neutral-300 px-2">
                                <span className="text-sm text-neutral-600">
                                    {location.name}
                                </span>
                            </div>
                            <div className="w-2/12 border-e border-neutral-300 px-2">
                                <span className="text-sm text-neutral-400">
                                    {location.city}
                                </span>
                            </div>
                            <div className="w-2/12 border-e border-neutral-300 px-2">
                                <span className="text-sm text-neutral-400">
                                    {location.country}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LocationsPage
