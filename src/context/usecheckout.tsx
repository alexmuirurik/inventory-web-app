'use client'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

const demoProduct = {
    id: '',
    name: '',
    buyingPrice: 0,
    sellingPrice: 0,
    count: 0,
}

export interface CheckoutProduct {
    id: String
    name: String
    buyingPrice: number
    sellingPrice: number
    count: number
}

const CheckoutContext = createContext<{
    products: CheckoutProduct[]
    setProducts: Dispatch<SetStateAction<CheckoutProduct[]>>
}>({
    products: [demoProduct],
    setProducts: () => {},
})

export const CheckoutContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [products, setProducts] = useState<CheckoutProduct[]>([demoProduct])
    console.log(products)
    return (
        <CheckoutContext.Provider value={{ products, setProducts }}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckoutContext = () => useContext(CheckoutContext)
