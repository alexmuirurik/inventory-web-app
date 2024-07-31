import { DataTableDemo } from '@/actions/getTasksData'
import CardBillings from '@/components/card/CardBillings'
import PageHeader from '@/components/card/PageHeader'
import { Button } from '@/components/ui/button'
import React from 'react'

const Billings = () => {
    return (
        <div className="page-wrapper">
            <PageHeader title='Billings' description='540+' >
                <div className="flex items-center gap-2">
                    <input type="text" className="bg-transparent focus-within:!ring-0 border text-sm ps-5 py-2" placeholder="Search" />
                    <Button className="bg-teal-500 hover:bg-teal-700">Add Funds</Button>
                </div>
            </PageHeader>
            <div className="page-body">
                <CardBillings />
            </div>
        </div>
    )
}

export default Billings