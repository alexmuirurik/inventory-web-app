import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/src/actions/businessController'
import DashboardPreviews from '@/src/components/dash/dashboardpreviews'
import DashSalesList from '@/src/components/dash/dashsaleslist'

const Dashboard = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business) return redirect('/settings')
    return (
        <div className="content space-y-3">
            <DashboardPreviews />
            <DashSalesList />
        </div>
    )
}

export default Dashboard