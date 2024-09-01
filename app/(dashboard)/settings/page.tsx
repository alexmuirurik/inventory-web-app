import React from 'react'
import PageHeader from '@/components/layouts/PageHeader'
import CreateCompany from '@/components/forms/createcompany'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'


const Settings = async () => {
    const session = await auth()
    const user = session?.user
    const company = await getCompany(user?.id as string)
    return (
        <div className="page-wrapper">
            <PageHeader title='Settings' description='new' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <Button className="w-full bg-teal-500 hover:bg-teal-700 ">Add Funds</Button>
                </div>
            </PageHeader>
            <div className="page-body flex gap-4">
                <div className="w-full">
                    <CreateCompany user={user} company={company} />
                </div>
                <div className="border w-full sm:w-5/12 md:w-4/12">
                    
                </div>
            </div>
        </div>
    )
}

export default Settings