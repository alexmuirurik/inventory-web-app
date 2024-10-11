import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { auth } from '@/auth'
import CreateBusiness from '@/components/forms/createbusiness'
import { getBusiness } from '@/actions/businessController'
import { getLocationById } from '@/actions/locationController'
import { getUser } from '@/actions/userController'
import ImageCrop from '@/components/forms/imagecrop'
import MpesaSubscribe from '@/components/forms/mpesasubscribe'
import { CompanyContextProvider } from '@/context/usecompany'

const Settings = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string) ?? undefined
    const user = await getUser(session?.user.id as string) ?? undefined
    const location = await getLocationById(user?.activeLocation as string) ?? undefined
    return (
        <div className="page-wrapper">
            <PageHeader title='Settings' description='new' >
                <div className="flex items-center gap-2"></div>
            </PageHeader>
            <div className="page-body sm:flex gap-4 space-y-4 sm:space-y-0">
                <CompanyContextProvider business={business}>
                    <div className="md:w-4/12 space-y-4">
                        <ImageCrop user={user} business={business} />
                        <MpesaSubscribe />
                    </div>
                    <div className="md:w-8/12 border p-4 w-full">
                        <CreateBusiness business={business} location={location} />
                    </div>
                </CompanyContextProvider>

            </div>
        </div>
    )
}

export default Settings