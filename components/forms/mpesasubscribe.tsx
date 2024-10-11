'use client'
import React, { ChangeEvent, useState } from 'react';
import { LoadingButton } from '../ui/loadingbutton';
import { Input } from '../ui/input';
import { sendSTKRequest } from '@/actions/mpesaController';

const MpesaSubscribe = () => {
    const [mobile, setMobile] = useState('')
    const [error, seterror] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleMobile = (event: ChangeEvent<HTMLInputElement>) => setMobile(event.currentTarget.value)
    const handleSubmit = async () => {
        if(mobile === '' || mobile.length < 12) return seterror(true)
        setLoading(true)
        const stksent = await sendSTKRequest(mobile)
        if(stksent) console.log(stksent)
        setLoading(false)
    }
    return (
        <div className='flex flex-col items-center gap-4 border p-4 '>
            <h4 className='text-sm font-bold'>Subscribe to use Inventory</h4>
            <Input className={(error) ? 'border-red-600' : '' + 'sm:w-8/12 placeholder:text-center text-center'} 
                placeholder='254...' onChange={handleMobile} />
            <LoadingButton className='bg-teal-600' loading={loading} onClick={() => handleSubmit()}  >
                Pay With Mpesa
            </LoadingButton>
        </div>
    );
}

export default MpesaSubscribe;
