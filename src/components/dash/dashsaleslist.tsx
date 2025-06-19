import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { File, ListFilter } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { DaySaleSupplyAndPettyCash, OrderLine } from '@/prisma/types'

const DashSalesList = ({
    orderLines,
}: {
    orderLines: DaySaleSupplyAndPettyCash[]
}) => {
    return (
        <Tabs defaultValue="week">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-sm"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 gap-1 text-sm"
                    >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>

            <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3" className="bg-transparent">
                    <CardContent className="px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Day</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Stock
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Sale
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Spoilt
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Other Expenses
                                    </TableHead>
                                    <TableHead className="table-cell">
                                        Petty Cash
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderLines.map((order) => {
                                    const totalSupplies = order.supplies.reduce(
                                        (prev, curr) => {
                                            return prev + curr.itemsCount
                                        },
                                        0
                                    )
                                    const totalSales = order.sales.reduce(
                                        (prev, curr) => {
                                            return prev + curr.itemsCount
                                        },
                                        0
                                    )
                                    const totalPettyCash =
                                        order.pettyCash.reduce((prev, curr) => {
                                            return prev + curr.pettyCash
                                        }, 0)
                                    const totalLoses = order.pettyCash.reduce(
                                        (prev, curr) => {
                                            return prev + curr.losses
                                        },
                                        0
                                    )
                                    const totalMiscellaneous =
                                        order.pettyCash.reduce((prev, curr) => {
                                            return prev + curr.miscellaneous
                                        }, 0)
                                    return (
                                        <TableRow
                                            key={order.id}
                                            className="bg-accent"
                                        >
                                            <TableCell>
                                                <div className="font-medium">
                                                    {order.date}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {totalSupplies}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge
                                                    className="text-xs"
                                                    variant="secondary"
                                                >
                                                    {totalSales}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {totalLoses}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {totalMiscellaneous}
                                            </TableCell>
                                            <TableCell className="">
                                                {totalPettyCash}
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

export default DashSalesList
