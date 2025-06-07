import React from 'react'
import PageHeader from '@/src/components/layouts/PageHeader'
import { auth } from '@/auth'
import CreateBusiness from '@/src/components/forms/createbusiness'
import { getBusiness } from '@/src/actions/businessController'
import { getLocationById } from '@/src/actions/locationController'
import ImageCrop from '@/src/components/forms/imagecrop'
import MpesaSubscribe from '@/src/components/forms/mpesasubscribe'
import { CompanyContextProvider } from '@/src/context/usecompany'

const Settings = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string) ?? undefined
    const location = (session?.user?.activeLocation) ? await getLocationById(session?.user?.activeLocation as string) ?? undefined : undefined
    return (
        <div className="page-wrapper">
            <PageHeader title='Settings' description='new' >
                <div className="flex items-center gap-2"></div>
            </PageHeader>
            <div className="page-body sm:flex gap-4 space-y-4 sm:space-y-0">
                <CompanyContextProvider business={business}>
                    <div className="md:w-4/12 space-y-4">
                        <ImageCrop />
                        <MpesaSubscribe userId={session?.user.id as string} business={business} />
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