'use client'
import React, { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useCheckoutContext } from '@/context/usecheckout'
import { Sale } from '@prisma/client'
import { LoadingButton } from '../ui/loadingbutton'
import { findActiveSale } from '@/actions/salesController'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

const CheckoutCart = ({
    activeSale,
    locationId,
}: {
    activeSale?: Sale
    locationId: string
}) => {
    const [loading, setLoading] = useTransition()
    const [sale, setSale] = useState(activeSale)
    const { products } = useCheckoutContext()
    const router = useRouter()
    const { toast } = useToast()

    const totalsellingPrice = products.reduce((prev, curr) => {
        return prev + curr.count * curr.sellingPrice
    }, 0)

    const totalprofit = products.reduce((prev, curr) => {
        return prev + (curr.sellingPrice - curr.buyingPrice) * curr.count
    }, 0)

    const handleButtonClick = async () => {
        if (!sale && products) {
            const activeSale = await findActiveSale(locationId)
            if (activeSale) {
                return setLoading(() =>
                    router.push('/order-line/' + activeSale.id)
                )
            }

            return toast({
                description: 'Error Getting Checkout Id',
                variant: 'destructive',
            })
        }

        if (!sale) {
            return toast({
                description: 'Add Products to cart before proceeding',
                variant: 'destructive',
            })
        }

        return setLoading(() => router.push('/order-line/' + sale.id))
    }

    return (
        <Card className="bg-transparent p-0">
            <CardHeader className="px-3 py-2">
                <CardTitle className="text-sm">Payments Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-col space-y-4">
                <div className=" w-full p-2 space-y-2">
                    <div className="flex justify-between border-b p-1">
                        <span className="text-xs">Selling Price SubTotal</span>
                        <span className="text-sm font-bold">
                            ${totalsellingPrice}.00
                        </span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className="text-xs">Tax Total</span>
                        <span className="text-sm font-bold">${0}.00</span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className="text-xs">Profit</span>
                        <span className="text-sm font-bold">
                            ${totalprofit}.00
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardHeader className="px-3 py-2">
                <CardTitle className="text-sm">Proceed</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-col ">
                <div className="space-y-2 w-full px-6 pb-4">
                    <p className="text-xs">
                        Click complete order button below to proceed to checkout
                        page
                    </p>
                </div>
                <div className="flex p-3 pt-0 w-full">
                    <LoadingButton
                        loading={loading}
                        className="bg-teal-500 hover:bg-teal-400 text-center text-white border rounded-lg w-full p-2"
                        onClick={() => handleButtonClick()}
                    >
                        Complete Order
                    </LoadingButton>
                </div>
            </CardContent>
        </Card>
    )
}

export default CheckoutCart
