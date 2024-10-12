import React from 'react'
import { auth } from '@/auth'
import DashChart from '@/components/dash/dashchart'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/actions/businessController'
import DashboardPreviews from '@/components/dash/dashboardpreviews'
import StockPreview from '@/components/dash/stockpreview'
import DashSalesList from '@/components/dash/dashsaleslist'

const Dashboard = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business || business.subscription !== 'active') return redirect('/settings')
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