import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getBusiness } from '@/src/actions/businessController'
import DashboardPreviews from '@/src/components/dash/dashboardpreviews'
import { getLocationById } from '@/src/actions/locationController'
import OrderLineCard from '@/src/components/cards/order-line-card'
import { getManySales } from '@/src/actions/salesController'
import SalesCard from '@/src/components/cards/sales-card'
import { getManyStocks } from '@/src/actions/stockController'
import { getManyOrderLines } from '@/src/actions/orderLineController'

const Dashboard = async () => {
    const session = await auth()
    if (!session) return redirect('/login')
    const business = await getBusiness(session?.user?.id)
    if (!business) return redirect('/settings')
    const businessLocation = await getLocationById(session?.user.activeLocation)
    if (!businessLocation) return redirect('/settings')
    const sales = (await getManySales(businessLocation.id)) ?? []
    const stock = (await getManyStocks(businessLocation.id)) ?? []
    const orderLines = (await getManyOrderLines(businessLocation.id)) ?? []

    const totalSales = sales.reduce((acc, sale) => {
        const sellingPrice = sale.saleItems.reduce((acc, saleItem) => {
            return (
                acc +
                (saleItem.product.stocks[0].sellingPrice ?? 0) *
                    saleItem.itemsCount
            )
        }, 0)
        return acc + sellingPrice
    }, 0)

    return (
        <div className="content space-y-3">
            <DashboardPreviews
                businessLocation={businessLocation}
                totalSales={totalSales}
                orderLines={orderLines}
                stock={stock}
            />
            <div className="pt-4">
                <span className="font-bold">Sales</span>
                <SalesCard sales={sales} />
            </div>
        </div>
    )
}

export default Dashboard
