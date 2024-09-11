'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import { Checkbox } from '../ui/checkbox';
import { FaFileInvoice } from 'react-icons/fa';
import { Product } from '@prisma/client';

const ProductsCard = ({products}: {products: Product[]}) => {
    const [checkbox, setCheckbox] = useState('hidden')
    return (
        <Table>
            <TableBody className='border-t border-gray-200 rounded-md'>
                {products.map(product => (
                    <TableRow key={product.id} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className={ checkbox + ' me-2 border-gray-400 data-[state=checked]:bg-teal-600 ' } />
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <FaFileInvoice className='text-base text-orange-600' />
                            {product.name}
                        </TableCell>
                        <TableCell>{product.buyingPrice}</TableCell>
                        <TableCell>{product.sellingPrice}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ProductsCard;
