import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { Checkbox } from '../ui/checkbox'
import { invoices } from '@/lib/sampledata'

const CardBillings = () => {
    return (
        <Table>
            <TableBody className='border-t border-gray-200 rounded-md'>
                {invoices.map((invoice, index) => (
                    <TableRow key={invoice.invoice} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className='me-2 border-gray-400 data-[state=checked]:bg-teal-600 '/>
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <FaFileInvoiceDollar className='text-base text-teal-600' />
                            {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CardBillings