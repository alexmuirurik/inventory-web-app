import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { CompleteLocation, CompleteOrderLine } from '@/prisma/types'
import { Stock } from '@prisma/client'

const DashboardPreviews = ({
    businessLocation,
    totalSales,
    orderLines,
    stock,
}: {
    businessLocation: CompleteLocation | null
    totalSales: number
    orderLines: CompleteOrderLine[]
    stock: Stock[]
}) => {
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
                    <div className="text-2xl font-bold">{totalSales.toFixed(2)} Ksh</div>
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
                    <div className="text-2xl font-bold">
                        {orderLines.length}
                    </div>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stock.length}</div>
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
                        {stock.reduce((acc, stock) => {
                            return acc + stock.itemsCount
                        }, 0)}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardPreviews
