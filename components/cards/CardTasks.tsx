import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FaFileWord } from 'react-icons/fa'
import { Checkbox } from '../ui/checkbox'

const invoices = [
    {
        invoice: "Invoice 001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "Invoice 002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "Invoice 003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "Invoice 004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "Invoice 005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "Invoice 006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "Invoice 007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]


const CardTasks = () => {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableBody className='border-t border-gray-200 rounded-md'>
                {invoices.map((invoice, index) => (
                    <TableRow key={invoice.invoice} className='items-center'>
                        <TableCell className='border-e border-gray-200 w-px p-1 pe-2'>
                            <Checkbox className='me-2 border-gray-400 data-[state=checked]:bg-teal-600 '/>
                        </TableCell>
                        <TableCell className="flex items-center gap-2 font-medium capitalize">
                            <FaFileWord className='text-base text-blue-600' />
                            {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default CardTasks