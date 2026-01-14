import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/src/actions/businessController'
import DashboardPreviews from '@/src/components/dash/dashboardpreviews'
import { getLocationById } from '@/src/actions/locationController'
import OrderLineCard from '@/src/components/cards/order-line-card'

const Dashboard = async () => {
    const session = await auth()
    if (!session) return redirect('/login')
    const business = await getBusiness(session?.user?.id)
    if (!business) return redirect('/settings')
    const businessLocation = await getLocationById(session?.user.activeLocation)
    return (
        <div className="content space-y-3">
            <DashboardPreviews businessLocation={businessLocation} />
            <OrderLineCard orderLines={[]} />
        </div>
    )
}

export default Dashboard
