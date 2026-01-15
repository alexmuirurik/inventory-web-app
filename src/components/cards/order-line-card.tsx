import { CompleteOrderLine } from '@/prisma/types'
import Link from 'next/link'

const OrderLineCard = ({ orderLines }: { orderLines: CompleteOrderLine[] }) => {
    return orderLines.map((orderLine) => (
        <div className="space-y-1 py-4">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    Product
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">Items</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Buying Price</span>
                </div>
            </div>
            {orderLine.orderLineItems.map((orderLineItem) => (
                <div
                    key={orderLineItem.id}
                    className="flex justify-between items-center gap-2 border p-2"
                >
                    <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                        <Link
                            href={`/products/${orderLineItem.product.id}`}
                            className="text-sm text-neutral-600 font-bold"
                        >
                            {orderLineItem.product.name}
                        </Link>
                    </div>
                    <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm text-neutral-400">
                            {orderLineItem.itemsCount}{' '}
                            {orderLineItem.product.units}
                        </span>
                    </div>
                    <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                        <span className="text-sm">
                            {(orderLineItem?.sellingPrice ?? 0).toFixed(2)} Ksh
                        </span>
                    </div>
                </div>
            ))}
        </div>
    ))
}

export default OrderLineCard
