import { findSale } from '@/src/actions/salesController'
import PageHeader from '@/src/components/layouts/PageHeader'
import { LoadingButton } from '@/src/components/ui/loadingbutton'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'

const CheckoutPage = async ({
    params,
}: {
    params: Promise<{ checkout: string }>
}) => {
    const checkoutItem = await findSale((await params).checkout)
    if (!checkoutItem) return notFound()
    return (
        <div className="page-wrapper">
            <PageHeader title="Order Summary" description="">
                <LoadingButton className="bg-teal-500 hover:bg-teal-400 text-white text-sm text-center font-mono border rounded-lg px-8 py-2">
                    <FaAngleLeft />
                    <span>Back</span>
                </LoadingButton>
            </PageHeader>
            <div className="flex gap-2">
                <div className="border md:w-6/12 lg:w-7/12 p-2">
                    <div className="flex justify-between items-center border w-full p-2">
                        <div className="border rounded-full p-2">
                            <Image 
                                className='!static h-10 w-10'
                                src={'/uploads/1.jpg'}
                                alt=''
                                height={8}
                                width={8}
                            />
                        </div>
                        <div className="title">
                            <h4 className='text-sm'>New Sneakers</h4>
                        </div>
                        <div className="price">
                            <span className='text-xs'>$34</span>
                        </div>
                    </div>
                </div>
                <div className="md:w-6/12 lg:w-5/12">

                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
