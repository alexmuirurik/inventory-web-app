import React from 'react'
import CardBillings from '@/components/cards/CardBillings'
import PageHeader from '@/components/layouts/PageHeader'
import PaymentsCard from '@/components/cards/paymentscard'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { getCompany } from '@/actions/companyController'
import { redirect } from 'next/navigation'

const Billings = async () => {
    const session = await auth()
    const company = await getCompany(session?.user?.id as string)
    if(!company) return redirect('/settings')
    return (
        <div className="page-wrapper">
            <PageHeader title='Billings' description='540+' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <Button className="w-full bg-teal-500 hover:bg-teal-700">Add Funds</Button>
                </div>
            </PageHeader>
            <div className="flex gap-4">
                <div className="sm:order-2 w-full sm-5/12 md:w-4/12 lg:w-3/12">
                    <PaymentsCard />
                </div>
                <div className="w-full sm-7/12 md:w-5/12 lg:w-9/12">
                    <CardBillings />
                </div>
                
            </div>
        </div>
    )
}

export default Billings