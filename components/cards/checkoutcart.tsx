'use client'
import React, { useState, useTransition } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { useCheckoutContext } from '@/context/usecheckout'
import { Sale } from '@prisma/client'
import { LoadingButton } from '../ui/loadingbutton'
import { findActiveSale } from '@/actions/salesController'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import Checkoutpaymentcard from './checkoutpaymentcard'
import { FaAngleRight } from 'react-icons/fa'

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
            <CardContent className="p-0 flex-col space-y-2">
                <div className=" w-full p-2 space-y-2">
                    <div className="flex justify-between p-1">
                        <span className="text-xs">Selling Price</span>
                        <span className="text-sm font-bold">
                            ${totalsellingPrice}.00
                        </span>
                    </div>
                    <div className="flex justify-between border-b p-1">
                        <span className="text-xs">Tax Total</span>
                        <span className="text-sm font-bold">${0}.00</span>
                    </div>
                    <div className="flex justify-between p-1">
                        <span className="text-xs">Price SubTotal</span>
                        <span className="text-sm font-bold">
                            ${totalsellingPrice}.00
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-0 py-4 flex-col ">
                <div className="flex p-2 pt-0 w-full">
                    <LoadingButton
                        loading={loading}
                        className="bg-teal-500 hover:bg-teal-400 flex items-center gap-1 text-center border rounded-lg w-full p-2"
                        onClick={() => handleButtonClick()}
                    >
                        <span className='text-white '>Make Payment</span>
                        <FaAngleRight className='text-white text-sm' />
                    </LoadingButton>
                </div>
            </CardFooter>
        </Card>
    )
}

export default CheckoutCart
