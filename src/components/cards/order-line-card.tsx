import { DaySaleSupplyAndPettyCash } from '@/prisma/types'
import React from 'react'

const OrderLineCard = ({
    orderLine,
}: {
    orderLine: DaySaleSupplyAndPettyCash[]
}) => {
    return orderLine.map((order) => {
        const totalSupplies = order.supplies.reduce((prev, curr) => {
            return prev + curr.itemsCount
        }, 0)
        const totalSales = order.sales.reduce((prev, curr) => {
            return prev + curr.itemsCount
        }, 0)
        const totalPettyCash = order.pettyCash.reduce((prev, curr) => {
            return prev + curr.pettyCash
        }, 0)
        const totalLoses = order.pettyCash.reduce((prev, curr) => {
            return prev + curr.losses
        }, 0)
        const totalMiscellaneous = order.pettyCash.reduce((prev, curr) => {
            return prev + curr.miscellaneous
        }, 0)
        return (
            <div className="flex justify-between items-center border border-neutral-300 w-full">
                <div className="w-2/12 p-3">
                    <span className="text-sm font-bold">{order.date}</span>
                </div>
                <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                    <span className="text-sm">{totalSupplies}</span>
                </div>
                <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                    <span className="text-sm">{totalSales.toFixed(2)}</span>
                </div>
                <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                    <span className="text-sm">{totalLoses.toFixed(2)}</span>
                </div>
                <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                    <span className="text-sm">{totalPettyCash.toFixed(2)}</span>
                </div>
                <div className="border-s border-neutral-300 rounded-none w-2/12 p-3">
                    <span className="text-sm">
                        {totalMiscellaneous.toFixed(2)}
                    </span>
                </div>
            </div>
        )
    })
}

export default OrderLineCard
