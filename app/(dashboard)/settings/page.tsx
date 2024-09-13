import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { auth } from '@/auth'
import CreateBusiness from '@/components/forms/createbusiness'
import { getBusiness } from '@/actions/businessController'
import { getLocationById } from '@/actions/locationController'
import { getUser } from '@/actions/userController'

const Settings = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string) ?? undefined
    const user     = await getUser(session?.user.id as string)
    const location = await getLocationById(user?.activeLocation as string) ?? undefined
    return (
        <div className="page-wrapper">
            <PageHeader title='Settings' description='new' >
                <div className="flex items-center gap-2"></div>
            </PageHeader>
            <div className="page-body flex gap-4">
                <div className="md:w-3/12">
                    dds
                </div>
                <div className="w-full md:w-9/12">
                    <CreateBusiness business={business} location={location}/>
                </div>
            </div>
        </div>
    )
}

export default Settings