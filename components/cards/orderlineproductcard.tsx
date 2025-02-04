'use client'
import React, { act, useRef, useState } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { useCheckoutContext } from '@/context/usecheckout'
import {
    CheckoutitemswithProducts,
    ProductWithCategoriesBrandsAndStock,
} from '@/prisma/types'
import Link from 'next/link'
import { toast } from 'sonner'
interface OrderLineProducts {
    locationId: string
    product: ProductWithCategoriesBrandsAndStock
    checkoutitem: CheckoutitemswithProducts | undefined
}

const OrderLineProductsCard = ({ locationId, product }: OrderLineProducts) => {
    const { products, setProducts } = useCheckoutContext()
    const activeproduct = products.find((item) => item.id === product.id)
    const productsinstock = product.productInStock.find(
        (stock) => stock.businessLocationId === locationId
    )

    const setProductId = () => {
        const sellingPrice = product?.sellingPrice ?? 0
        const buyingPrice = product?.buyingPrice ?? 0
        if (!activeproduct) {
            products.push({
                id: product.id,
                name: product.name,
                count: 1,
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
            })
            return setProducts(products)
        }

        const newproducts = products.map((item) => {
            if (item.id === product.id)
                return { ...item, count: activeproduct.count + 1 }
            return item
        })

        return setProducts(newproducts)
    }

    const removeProductId = () => {
        if (!activeproduct) return

        if (activeproduct.count === 1) {
            const prods = products.filter(
                (product) => product.id !== activeproduct?.id
            )
            return setProducts(prods)
        }

        const newproducts = products.map((item) => {
            if (item.id === product.id)
                return { ...item, count: activeproduct.count - 1 }
            return item
        })
        setProducts(newproducts)
    }

    return (
        <Card
            key={product.id}
            className={`bg-transparent h-fit p-0 overflow-hidden`}
        >
            <div className="flex items-center gap-1 border px-2 ">
                <div className="flex image-box overflow-clip">
                    <Image
                        className="!static w-12 h-12"
                        src={product.image ?? '/uploads/1.jpg'}
                        alt=""
                        width={10}
                        height={10}
                    />
                </div>
                <div className={' w-fill p-2 overflow-hidden '}>
                    <Link
                        href={'/products/' + product.id}
                        className="hover:text-teal-900 text-sm font-bold text-gray-800 text-nowrap"
                    >
                        {product.name}
                    </Link>
                    <p className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <span
                            className={
                                'text-xs ' + (productsinstock?.count ?? 0 > 0)
                                    ? 'text-teal-600'
                                    : 'text-red-600'
                            }
                        >
                            {productsinstock?.count ?? 0 > 0
                                ? productsinstock?.count + ' in stock'
                                : 'Out of Stock'}
                        </span>
                    </p>
                </div>
            </div>

            <CardFooter className="flex justify-between items-center select-none px-2 py-2">
                <p className="text-lg text-teal-700 font-bold cursor-text">
                    ${product.sellingPrice ?? 0}
                </p>
                <div className="flex items-center gap-2">
                    <Minus
                        className="bg-gray-300 text-gray-700 h-4 w-4 p-0.5 cursor-pointer"
                        onClick={() => setProductId()}
                    />
                    <span className="text-teal-500 font-bold">
                        {activeproduct?.count ?? 0}
                    </span>
                    <Plus
                        className="bg-teal-500 text-gray-700 w-4 h-4 p-0.5 cursor-pointer"
                        onClick={() => removeProductId()}
                    />
                </div>
            </CardFooter>
        </Card>
    )
}

export default OrderLineProductsCard
