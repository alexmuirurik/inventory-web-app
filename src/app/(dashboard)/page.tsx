import React from 'react'
import { auth } from '@/auth'
import DashChart from '@/src/components/dash/dashchart'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/src/actions/businessController'
import DashboardPreviews from '@/src/components/dash/dashboardpreviews'
import StockPreview from '@/src/components/dash/stockpreview'
import DashSalesList from '@/src/components/dash/dashsaleslist'

const Dashboard = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business) return redirect('/settings')
    return (
        <div className="content space-y-3">
            <DashboardPreviews />
            <div className="flex gap-2 w-full">
                <DashChart className='bg-transparent md:w-8/12' />
                <StockPreview className='bg-transparent md:w-4/12' />
            </div>
            <DashSalesList />
        </div>
    )
}

export default Dashboard