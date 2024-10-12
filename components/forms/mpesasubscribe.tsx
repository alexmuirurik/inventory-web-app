'use client'
import React, { ChangeEvent, useRef, useState } from 'react';
import { LoadingButton } from '../ui/loadingbutton';
import { Input } from '../ui/input';
import { initiateMPesaPayment } from '@/actions/mpesaController';
import { getBusinessSubscriptionByID } from '@/actions/businessController';
import { Business } from '@prisma/client';
import { useRouter } from 'next/navigation';

const MpesaSubscribe = ({ userId, business }: { userId: string, business?: Business }) => {
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const count = useRef(0)
    const router = useRouter()
    const handleMobile = (event: ChangeEvent<HTMLInputElement>) => setMobile(event.currentTarget.value)
    const handleSubmit = async () => {
        if (mobile === '' || mobile.length < 12) return setError('Incorrect Mobile Number')
        if(!business?.id) return setError('Create a Business First to Proceed')
        setError('')
        setLoading(true)
        const stksent = await initiateMPesaPayment(1, mobile, business?.id as string)
        if (!stksent) return setLoading(false)
        const loop = setInterval(async () => {
            count.current++
            const subscription = await getBusinessSubscriptionByID(stksent.id)
            if (!subscription || count.current > 10) {
                setError('Payment Not Successfull')
                setLoading(false)
                clearInterval(loop)
            } else if (subscription.status === 'paid') {
                router.refresh()
                setLoading(false)
                clearInterval(loop)
            }

        }, 2000,)
    }
    return (
        <div className='flex flex-col items-center gap-4 border p-4 '>
            <h4 className='text-sm font-bold'>Subscribe to use Inventory</h4>
            {(error !== '') && <p className='text-xs text-red-600'>{error}</p>}
            <Input className={'sm:w-8/12 placeholder:text-center text-center'}
                placeholder='254...' onChange={handleMobile} />
            <LoadingButton className='bg-teal-600' loading={loading} onClick={() => handleSubmit()} variant={error ? 'destructive' : 'outline'}  >
                Pay With Mpesa
            </LoadingButton>
        </div>
    );
}

export default MpesaSubscribe;
