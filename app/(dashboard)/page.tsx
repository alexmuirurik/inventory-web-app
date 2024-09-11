import React from 'react'
import { auth } from '@/auth'
import DashChart from '@/components/cards/dashchart'
import { redirect } from 'next/navigation'

const Dashboard = async () => {
    const session = await auth()

    return (
        <div className="content">
            <DashChart />
        </div>
    )
}

export default Dashboard