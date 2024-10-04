'use client'
import { addProductToCart } from '@/actions/salesController';
import { ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface checkoutContextProvider {
    fullproducts: ProductWithCategoriesBrandsAndStock [],
    businessLocationId: string, 
    children: ReactNode
}

const checkoutInitializer = {
    products: [ { productId: '', stock: 0, count: 0, buyingPrice: 0, sellingPrice: 0 } ],
    setProductId: (productId: string, count:number) => {},
    removeProductId: (productId: string) => {} 
}

const checkoutContext = createContext(checkoutInitializer) 

export const CheckoutContextProvider = ({fullproducts, businessLocationId, children}: checkoutContextProvider) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<{productId: string, stock: number, count: number, buyingPrice: number, sellingPrice: number}[]>([])
    const setProductId = async (productId: string, count: number) => {
        const product = fullproducts.find(product => product.id === productId)
        const stock = product?.productInStock.find(stock => stock.businessLocationId === businessLocationId)
        const itemsinstock = stock?.count ?? 0
        const sellingPrice = stock?.sellingPrice ?? 0
        const buyingPrice = stock?.buyingPrice ?? 0
        const prods = [...products.filter((o) => o.productId !== productId), { 
            productId: productId, 
            stock: itemsinstock,
            count: count, 
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice
        }] 
        return setProducts(prods)
    }

    const removeProductId = (productId: string) => {
        const prods = products.filter(product => product.productId !== productId)
        return setProducts(prods)
    }

    return <checkoutContext.Provider value={{products, setProductId, removeProductId}}>
        {children}
    </checkoutContext.Provider>
}

export const useCheckoutContext = () => useContext(checkoutContext);
