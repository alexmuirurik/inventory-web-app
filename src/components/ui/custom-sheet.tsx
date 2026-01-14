'use client'

import { salesSchema, stockSchema } from '@/prisma/schema'
import { Button } from '@/src/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/src/components/ui/sheet'
import { Product } from '@prisma/client'
import { z } from 'zod'

const CustomSheet = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    stocks,
    products,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    children: React.ReactNode
    stocks: z.infer<typeof stockSchema>[] | z.infer<typeof salesSchema>[]
    products: Product[]
}) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button className="bg-teal-500 hover:bg-teal-400 text-gray-200 hover:text-gray-100 w-full sm:w-auto font-mono font-bold">
                    {title}
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-neutral-600 flex flex-col justify-between p-0">
                <div className="item">
                    <SheetHeader className="flex flex-col items-center border-b rounded-none py-4">
                        <SheetTitle className="text-teal-600">
                            {title}
                        </SheetTitle>
                        <SheetDescription className="text-cyan-50">
                            {description ?? 'Create Fill in the form details'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-2">
                        <div className="flex justify-between w-full border-b border-neutral-500 rounded-none px-6 py-2">
                            <p className="text-neutral-200 text-sm">
                                <span className='me-2'>#</span>
                                <span>Product</span>
                            </p>
                            <p className="text-neutral-200 text-sm">Quantity</p>
                        </div>
                        {stocks.map((stock, i) => {
                            const product = products.find(
                                (product) => product.id === stock.productId
                            )
                            return (
                                <div
                                    key={stock.productId}
                                    className="flex justify-between w-full border-b border-neutral-700 px-6 py-1 rounded-none"
                                >
                                    <p className="text-neutral-300 text-xs">
                                        <span className='me-2'>{i + 1}</span>
                                        <span>{product?.name}</span>
                                    </p>
                                    <p className="text-neutral-300 text-xs">
                                        {stock.itemsCount} {product?.units}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="border-t rounded-t-none">{children}</div>
            </SheetContent>
        </Sheet>
    )
}

export default CustomSheet
