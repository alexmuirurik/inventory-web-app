import React from 'react'
import CardInvoices from '@/components/cards/CardInvoices'
import PageHeader from '@/components/layouts/PageHeader'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Invoices = async () => {
    const session = await auth()
    return (
        <div className="page-wrapper">
            <PageHeader title='Invoices' description='540+' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <Button className="bg-teal-500 hover:bg-teal-700 px-8">Add Funds</Button>
                </div>
            </PageHeader>
            <div className="page-body">
                <CardInvoices />
            </div>
        </div>
    )
}

export default Invoices