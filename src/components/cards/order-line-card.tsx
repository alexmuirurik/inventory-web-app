'use client'

import { CompleteOrderLine } from '@/prisma/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const OrderLineCard = ({ orderLines }: { orderLines: CompleteOrderLine[] }) => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const orderLine = orderLines.find((orderLine) => orderLine.id === id)
    return orderLine ? (
        <div className="space-y-1 py-4 w-full">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    <Link href="/stocks-line" className="text-sm text-teal-500 font-bold">
                        {'<- Back'}
                    </Link>
                </div>
                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Selling Price</span>
                </div>
                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">Items</span>
                </div>

                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-500">
                        Total Price
                    </span>
                </div>
            </div>
            {orderLine.orderLineItems.map((orderLineItem, i) => {
                return (
                    <div
                        key={orderLineItem.id}
                        className="flex justify-between items-center gap-2 border p-2"
                    >
                        <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                            <span className="text-xs text-neutral-500 font-bold">
                                {orderLineItem.product.name}
                            </span>
                        </div>
                        <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm text-neutral-400">
                                {orderLineItem.itemsCount} {' Items'}
                            </span>
                        </div>
                        <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm">
                                {(
                                    orderLineItem.product.stocks[0]
                                        .sellingPrice ?? 0
                                ).toFixed(2)}
                                {' Ksh'}
                            </span>
                        </div>
                        <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm text-neutral-500">
                                {(
                                    orderLineItem.itemsCount *
                                    (orderLineItem.product.stocks[0]
                                        ?.sellingPrice ?? 0)
                                ).toFixed(2)}
                                {' Ksh'}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    ) : (
        <div className="space-y-1 py-4">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    <span className="text-neutral-400">Date</span>
                </div>
                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Products</span>
                </div>
                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">Items</span>
                </div>
                <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Total Price</span>
                </div>
            </div>
            {orderLines.map((orderLine) => (
                <div
                    key={orderLine.id}
                    className="flex justify-between items-center gap-2 border p-2"
                >
                    <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                        <Link
                            href={`/stocks-line?id=${orderLine.id}`}
                            className="text-xs text-neutral-500 font-bold"
                        >
                            {orderLine.createdAt.toLocaleString(undefined, {
                                day: 'numeric',
                                month: 'short',
                            })}
                            {', '}
                            {orderLine.createdAt.toLocaleString(undefined, {
                                timeStyle: 'short',
                                timeZone: 'Africa/Nairobi',
                            })}
                        </Link>
                    </div>
                    <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-400">
                            {orderLine.orderLineItems.length} {' Products'}
                        </span>
                    </div>
                    <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-600">
                            {orderLine.orderLineItems.reduce(
                                (acc, item) => item.itemsCount + acc,
                                0
                            )}
                            {' Total Items'}
                        </span>
                    </div>
                    <div className="w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-400">
                            {(
                                orderLine.orderLineItems.reduce(
                                    (acc, item) =>
                                        ((item.sellingPrice ?? 0) * item.itemsCount) + acc,
                                    0
                                ) 
                            ).toFixed(2)}{' '}
                            Ksh
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderLineCard
