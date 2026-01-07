import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/src/actions/businessController'
import DashboardPreviews from '@/src/components/dash/dashboardpreviews'
import { getManyOrderLines } from '@/src/actions/orderLineController'
import { getLocationById } from '@/src/actions/locationController'
import OrderLineCard from '@/src/components/cards/order-line-card'

const Dashboard = async () => {
    const session = await auth()
    if (!session) return redirect('/login')
    const business = await getBusiness(session?.user?.id)
    if (!business) return redirect('/settings')
    const businessLocation = await getLocationById(session?.user.activeLocation)
    const orderLines = await getManyOrderLines(businessLocation?.id)
    return (
        <div className="content space-y-3">
            <DashboardPreviews businessLocation={businessLocation} />
            <OrderLineCard orderLines={orderLines} />
        </div>
    )
}

export default Dashboard
