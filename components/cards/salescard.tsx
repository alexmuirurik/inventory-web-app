import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { File, ListFilter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { SaleWithCheckoutItem } from '@/prisma/types';

const SalesCard = ({ sales }: { sales: SaleWithCheckoutItem[] }) => {
    return (
        <Tabs defaultValue="week">
            <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3" className='bg-transparent'>
                    <CardHeader className="px-7">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="week">Week</TabsTrigger>
                                <TabsTrigger value="month">Month</TabsTrigger>
                                <TabsTrigger value="year">Year</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 gap-1 text-sm" >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Filter</span>
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
                                <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" >
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Export</span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table >
                            <TableBody>
                                {sales.map(sale => {
                                    return <TableRow className="bg-accent py-1">
                                        <TableCell className='py-1'>
                                            <div className="font-medium">{sale.customer.name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {sale.customer.mobile}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-1">
                                            <Badge className="text-xs" variant="secondary">
                                                {sale.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-1">
                                            total Items: {sale.checkoutitems.length}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-1">
                                            ${sale.amount}.00
                                        </TableCell>
                                        <TableCell className="text-right text-xs py-1">
                                            Balance: {sale?.arrears ?? 0}
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs >
    );
}

export default SalesCard;
