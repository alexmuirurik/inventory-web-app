'use client'

import { CompleteSale } from '@/prisma/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const SalesCard = ({ sales }: { sales: CompleteSale[] }) => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const sale = sales.find((sale) => sale.id === id)
    return sale ? (
        <div className="space-y-1">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    <Link
                        href="/sales-line"
                        className="text-sm text-teal-500 font-bold"
                    >
                        {'<- Back'}
                    </Link>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">
                        Selling Price
                    </span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Items Sold</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-500">
                        Total Revenue
                    </span>
                </div>
            </div>
            {sale.saleItems.map((saleItem, i) => {
                return (
                    <div
                        key={saleItem.id}
                        className="flex justify-between items-center gap-2 border p-2"
                    >
                        <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                            <span className="text-xs text-neutral-500 font-bold">
                                {saleItem.product.name}
                            </span>
                        </div>
                        <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm text-neutral-400">
                                {(
                                    saleItem.product.stocks[0].sellingPrice ?? 0
                                ).toFixed(2)}{' '}
                                {' Ksh'}
                            </span>
                        </div>
                        <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm">
                                {saleItem.itemsCount} {saleItem.product.units}
                            </span>
                        </div>
                        <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                            <span className="text-sm text-neutral-500">
                                {(
                                    saleItem.itemsCount *
                                    (saleItem.product.stocks[0].sellingPrice ??
                                        0)
                                ).toFixed(2)}
                                {' Ksh'}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    ) : (
        <div className="space-y-1 py-4 w-full">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    <span className="text-sm font-bold">Date</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">Items</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Products</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-500">
                        Total Revenue
                    </span>
                </div>
            </div>
            {sales.map((sale) => (
                <div
                    key={sale.id}
                    className="flex justify-between items-center gap-2 border p-2"
                >
                    <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                        <Link
                            href={`/sales-line?id=${sale.id}`}
                            className="text-xs text-neutral-500 font-bold"
                        >
                            {sale.createdAt.toLocaleString(undefined, {
                                day: 'numeric',
                                month: 'short',
                            })}
                            {', '}
                            {sale.createdAt.toLocaleString(undefined, {
                                timeStyle: 'short',
                                timeZone: 'Africa/Nairobi',
                            })}
                        </Link>
                    </div>
                    <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-400">
                            {sale.saleItems.reduce((acc, saleItem) => {
                                return acc + saleItem.itemsCount
                            }, 0)}
                            {' Items'}
                        </span>
                    </div>
                    <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm">
                            {sale.saleItems.length} {' Products'}
                        </span>
                    </div>
                    <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-500">
                            {sale.saleItems
                                .reduce((acc, item) => {
                                    return (
                                        item.itemsCount *
                                            (item.product.stocks[0]
                                                ?.sellingPrice ?? 0) +
                                        acc
                                    )
                                }, 0)
                                .toFixed(2)}
                            {' Ksh'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SalesCard
