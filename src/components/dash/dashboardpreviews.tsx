import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { CompleteLocation } from '@/prisma/types'

const DashboardPreviews = ({
    businessLocation,
}: {
    businessLocation: CompleteLocation | null
}) => {
    const totalRevenue = businessLocation?.sales.reduce(
        (p, c) => p + c.sellingPrice * c.itemsCount,
        0
    )
    const supplies = businessLocation?.supplies.reduce(
        (p, c) => p + c.itemsCount,
        0
    )
    const sales = businessLocation?.sales.reduce((p, c) => p + c.itemsCount, 0)
    return (
        <div className="grid md:grid-cols-2 gap-2 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {totalRevenue?.toFixed(2)} Ksh
                    </div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Supplies
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{supplies}</div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{sales}</div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        In Stock
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {supplies && sales && supplies - sales}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardPreviews
