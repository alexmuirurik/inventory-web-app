'use client'
import React from 'react';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { useSearchContext } from '@/context/usesearch';
import OrderLineProductsCard from './orderlineproductcard';

interface OrderLineProducts { 
    locationId: string, products: ProductWithCategoriesBrandsAndStock[],  checkoutitems: CheckoutitemswithProducts[]
}

const OrderList = ({locationId, products, checkoutitems}: OrderLineProducts) => {
    const { search } = useSearchContext()
    const newproducts = products.filter(product => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return newproducts.map( product => { 
        const checkoutitem = checkoutitems.find(checkoutitem => checkoutitem.productId === product.id)
        return <OrderLineProductsCard locationId={locationId} product={product} checkoutitem={checkoutitem} /> 
    });
}

export default OrderList;
