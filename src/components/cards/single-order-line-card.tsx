import React from 'react'
import { Tabs, TabsContent } from '../ui/tabs'
import { Card, CardContent } from '../ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { CompleteProduct, DaySaleSupplyAndPettyCash } from '@/prisma/types'
import Link from 'next/link'

const SingleOrderLineCard = ({
    orderLine,
    products,
}: {
    orderLine: DaySaleSupplyAndPettyCash
    products: CompleteProduct[]
}) => {
    return (
        <Tabs defaultValue="week">
            <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3" className="bg-transparent">
                    <CardContent className="px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="table-cell">
                                        Product
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Supplies
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Spent
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Sold
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Income
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        In Stock
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => {
                                    const totalSupplies =
                                        orderLine.supplies.reduce(
                                            (prev, curr) => {
                                                if (
                                                    curr.productId ===
                                                    product.id
                                                ) {
                                                    return (
                                                        prev + curr.itemsCount
                                                    )
                                                } else {
                                                    return prev
                                                }
                                            },
                                            0
                                        )

                                    const totalSpent =
                                        orderLine.supplies.reduce(
                                            (prev, curr) => {
                                                if (
                                                    curr.productId ===
                                                    product.id
                                                ) {
                                                    return (
                                                        prev +
                                                        curr.itemsCount *
                                                            curr.buyingPrice
                                                    )
                                                } else {
                                                    return prev
                                                }
                                            },
                                            0
                                        )

                                    const totalSold = orderLine.sales.reduce(
                                        (prev, curr) => {
                                            if (curr.productId === product.id) {
                                                return prev + curr.itemsCount
                                            } else {
                                                return prev
                                            }
                                        },
                                        0
                                    )

                                    const totalSales = orderLine.sales.reduce(
                                        (prev, curr) => {
                                            if (curr.productId === product.id) {
                                                return (
                                                    prev +
                                                    curr.itemsCount *
                                                        curr.sellingPrice
                                                )
                                            } else {
                                                return prev
                                            }
                                        },
                                        0
                                    )

                                    return (
                                        <TableRow
                                            key={product.id}
                                            className="bg-accent"
                                        >
                                            <TableCell>
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="text-neutral-600 font-bold"
                                                >
                                                    {product.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <span className="me-1">
                                                    {totalSupplies}
                                                </span>
                                                <span>{product.units}</span>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-xs gap-2">
                                                <span className="me-1">
                                                    {totalSpent.toLocaleString()}
                                                </span>
                                                <span>Ksh</span>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <span className="me-1">
                                                    {totalSold}
                                                </span>
                                                <span>{product.units}</span>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-xs gap-2">
                                                <span className="me-1">
                                                    {totalSales.toLocaleString()}
                                                </span>
                                                <span>Ksh</span>
                                            </TableCell>
                                            <TableCell className="">
                                                {totalSupplies - totalSold}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default SingleOrderLineCard
