'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { productInStockAndProductAndPurchase } from '@/prisma/types';

const StocksCard = ({products}: {products: productInStockAndProductAndPurchase[]}) => {
    const [checkbox, setCheckbox] = useState('hidden')
    return (
        <Table>
            <TableBody className='border-t border-gray-200 rounded-md'>
                {products.map(stock => (
                    <TableRow key={stock.id} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className={ checkbox + ' me-2 border-gray-400 data-[state=checked]:bg-teal-600 ' } />
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <img src={stock.product.image} className='static w-6 h-6' alt=''/>
                            {stock.product.name}
                        </TableCell>
                        <TableCell>{stock.count}</TableCell>
                        <TableCell>{stock.buyingPrice}</TableCell>
                        <TableCell>{stock.sellingPrice}</TableCell>
                        <TableCell>{stock.discount}</TableCell>
                        <TableCell className="text-right">{stock.product.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default StocksCard;
