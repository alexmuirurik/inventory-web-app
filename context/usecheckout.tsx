'use client'
import { addProductToCart } from '@/actions/salesController';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface checkoutContextProvider {
    productsInCart: CheckoutitemswithProducts[],
    fullproducts: ProductWithCategoriesBrandsAndStock[],
    businessLocationId: string,
    children: ReactNode
}

export interface itemInCart { productId: string, stock: number, count: number, buyingPrice: number, sellingPrice: number }

const checkoutInitializer = {
    addingToCart: false,
    setAddingToCart: (change: boolean) => { },
    products: [{ productId: '', stock: 0, count: 0, buyingPrice: 0, sellingPrice: 0 }],
    setProductId: (productId: string, count: number) => { },
    removeProductId: (productId: string) => { }
}

const checkoutContext = createContext(checkoutInitializer)

export const CheckoutContextProvider = ({ productsInCart, fullproducts, businessLocationId, children }: checkoutContextProvider) => {
    const [addingToCart, setAddingToCart] = useState(false)
    const [products, setProducts] = useState<itemInCart[]>(productsInCart.map(checkoutItem => {
        const product = fullproducts.find(product => product.id === checkoutItem.product.id)
        const stock = product?.productInStock.find(stock => stock.businessLocationId === businessLocationId)
        const itemsinstock = stock?.count ?? 0
        const sellingPrice = stock?.sellingPrice ?? 0
        const buyingPrice = stock?.buyingPrice ?? 0
        return {
            productId: checkoutItem.product.id,
            stock: itemsinstock,
            count: checkoutItem.count,
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice
        }
    }))

    const setProductId = async (productId: string, count: number) => {
        const product = fullproducts.find(product => product.id === productId)
        const stock = product?.productInStock.find(stock => stock.businessLocationId === businessLocationId)
        const itemsinstock = stock?.count ?? 0
        const sellingPrice = stock?.sellingPrice ?? 0
        const buyingPrice = stock?.buyingPrice ?? 0
        if (products.find(item => item.productId === productId)) {
            const newproducts = products.map(product => {
                if (product.productId === productId) return { ...product, count: count }
                return product
            })
            return setProducts(newproducts)
        }
        products.push({ productId: productId, stock: itemsinstock, count: count,  buyingPrice: buyingPrice, sellingPrice: sellingPrice })
        return setProducts(products)
    }

    const removeProductId = (productId: string) => {
        const prods = products.filter(product => product.productId !== productId)
        return setProducts(prods)
    }

    return <checkoutContext.Provider value={{ addingToCart, setAddingToCart, products, setProductId, removeProductId }}>
        {children}
    </checkoutContext.Provider>
}

export const useCheckoutContext = () => useContext(checkoutContext);
