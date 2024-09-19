'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { CheckoutItemsWithProducts } from '@/prisma/types';

const CheckoutItems = ({ checkoutitems }: {checkoutitems: CheckoutItemsWithProducts[]}) => {
    const [checkbox, setCheckbox] = useState('hidden')
    return (
        <Table>
            <TableBody className='border-t border-gray-200 rounded-md'>
                {checkoutitems.map(checkoutitem => (
                    <TableRow key={checkoutitem.id} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className={ checkbox + ' me-2 border-gray-400 data-[state=checked]:bg-teal-600 ' } />
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <img src={checkoutitem.product.image} className='static w-6 h-6' alt=''/>
                            {checkoutitem.product.name}
                        </TableCell>
                        <TableCell>{checkoutitem.count}</TableCell>
                        <TableCell>{checkoutitem.buyingPrice}</TableCell>
                        <TableCell>{checkoutitem.sellingPrice}</TableCell>
                        <TableCell className="text-right">{checkoutitem.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default CheckoutItems;
