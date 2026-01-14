'use client'

import { salesSchema, stockSchema } from '@/prisma/schema'
import { CompleteProduct } from '@/prisma/types'
import { z } from 'zod'

const AddStockCard = ({
    items,
    products,
}: {
    items: z.infer<typeof salesSchema>[] | z.infer<typeof stockSchema>[]
    products: CompleteProduct[]
}) => {
    return (
        <div className="w-full lg:w-9/12 max-h-52 overflow-y-scroll space-y-2">
            <div className="bg-neutral-200 flex justify-between w-full px-6 py-2 border">
                <p className="text-sm">
                    <span className="me-2">#</span>
                    <span>Product</span>
                </p>
                <p className="text-sm">Quantity</p>
            </div>
            {items.map((item, i) => {
                const product = products.find(
                    (product) => product.id === item.productId
                )
                return (
                    <div
                        key={item.productId}
                        className="flex justify-between w-full border-t px-6 py-2 border mt-1"
                    >
                        <p className="text-xs">
                            <span className="me-2">{i + 1}</span>
                            <span>{product?.name}</span>
                        </p>
                        <p className="text-xs">
                            {item.itemsCount} {product?.units}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default AddStockCard