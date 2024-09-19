'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface productcontext {
    productId: string, 
    setProduct: (productId: string) => void
}
const productContext = createContext<productcontext>({productId:'', setProduct: () => {}})

export const ProductContentProvider = ({children}: {children: ReactNode}) => {
    const [productId, setProductId] = useState('')
    const setProduct = (productId: string) => {
        setProductId(productId)
    }
    return <productContext.Provider value={{productId, setProduct}} >
        {children}
    </productContext.Provider>
}

export const useProduct = () => useContext(productContext)
