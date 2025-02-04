import React, { useState } from 'react'

const Checkoutpaymentcard = () => {
    const [activePayment, setActivePayment] = useState('')
    return (
        <div className="flex items-center gap-2 px-2">
            <div
                className={`${
                    activePayment === 'cash' ? 'bg-teal-300 ' : 'bg-teal-100 '
                } hover:bg-teal-300 border text-center text-sm w-full p-2 cursor-pointer`}
                onClick={() => setActivePayment('cash')}
            >
                Cash
            </div>
            <div
                className={`${
                    activePayment === 'mpesa' ? 'bg-teal-300 ' : 'bg-teal-100 '
                } hover:bg-teal-300 border text-center text-sm w-full p-2 cursor-pointer`}
                onClick={() => setActivePayment('mpesa')}
            >
                Mpesa
            </div>
        </div>
    )
}

export default Checkoutpaymentcard
