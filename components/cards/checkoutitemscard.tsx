'use client'
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { useCheckoutContext } from '@/context/usecheckout';
import { CheckoutitemswithProducts, ProductWithCategoriesBrandsAndStock } from '@/prisma/types';
import { Minus, Plus } from 'lucide-react';

const CheckoutItemsCard = ({ checkoutitems, fullproducts }: { checkoutitems:  CheckoutitemswithProducts[], fullproducts: ProductWithCategoriesBrandsAndStock[] }) => {
    const { products } = useCheckoutContext()
    return products.map(checkoutitem => {
        const product = fullproducts.find(product => product.id === checkoutitem.productId)
        return <Table>
            <TableBody className='border-t border-gray-200 rounded-md'>
                <TableRow key={checkoutitem.productId} className='flex items-center gap-1'>
                    <TableCell className="flex items-center gap-2 w-9/12 p-1">
                        <img src={'/uploads/1.jpg'} className='static w-6 h-6' alt='' />
                        <div className="">
                            <span className='font-medium text-xs'>{product?.name}</span>
                            <p className='text-xxs'>${checkoutitem.sellingPrice}</p>
                        </div>
                    </TableCell>
                    <TableCell className='p-1'>
                        <div className="flex items-center gap-2">
                            <Minus className='bg-gray-300 text-gray-700 h-3 w-3 p-0.5 cursor-pointer rounded-sm' />
                            <span className='text-teal-500 font-bold text-xs'>{checkoutitem.count}</span>
                            <Plus className='bg-teal-500 text-gray-700 w-3 h-3 p-0.5 cursor-pointer rounded-sm' />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    });
}

export default CheckoutItemsCard;
