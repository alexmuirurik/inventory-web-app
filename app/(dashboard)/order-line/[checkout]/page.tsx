import { findSale } from '@/actions/salesController'
import { notFound } from 'next/navigation'
import React from 'react'

const CheckoutPage = async ({
    params,
}: {
    params: Promise<{ checkout: string }>
}) => {
    const checkoutItem = await findSale((await params).checkout)
    if (!checkoutItem) return notFound()
    return <div></div>
}

export default CheckoutPage
