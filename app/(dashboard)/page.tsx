import React from 'react'
import { auth } from '@/auth'
import DashChart from '@/components/cards/dashchart'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/actions/businessController'

const Dashboard = async () => {
    const session = await auth()
    const business = await getBusiness(session?.user?.id as string)
    if(!business) return redirect('/settings')
    return (
        <div className="content">
            <DashChart />
        </div>
    )
}

export default Dashboard