import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import { auth } from '@/auth'
import CreateBusiness from '@/components/forms/createbusiness'

const Settings = async () => {
    const session = await auth()
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
                    <CreateBusiness />
                </div>
            </div>
        </div>
    )
}

export default Settings