'use client'
import { useCheckoutContext } from '@/context/usecheckout'

const CheckoutItemsCard = () => {
    const { products } = useCheckoutContext()
    return (
        <div className="max-h-72 [&::-webkit-scrollbar]:w-0.5 space-y-2 overflow-scroll">
            <div className="bg-neutral-200 flex justify-between items-center border py-3 px-2">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">
                            Product Name
                        </span>
                        <span className="text-teal-600 text-xs">3x in cart</span>
                    </div>
                </div>
                <p className="text-xs font-semibold">$43.90</p>
            </div>
        </div>
    )
}

export default CheckoutItemsCard
