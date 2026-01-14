import { CompleteSale } from '@/prisma/types'
import Link from 'next/link'

const SalesCard = ({ sales }: { sales: CompleteSale[] }) => {
    return (
        <div className="space-y-1 py-4 w-full">
            <div className="bg-neutral-200 flex justify-between items-center gap-2 border p-2">
                <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                    Product
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm text-neutral-400">Items</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Selling Price</span>
                </div>
                <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                    <span className="text-sm">Sold On</span>
                </div>
            </div>
            {sales.map((sale) => (
                <div className="space-y-1 w-full">
                    {sale.saleItems.map((saleItem) => (
                        <div
                            key={saleItem.id}
                            className="flex justify-between items-center gap-2 border p-2"
                        >
                            <div className="flex items-center gap-2 w-1/4 overflow-clip cursor-pointer border-e border-neutral-300 rounded-none">
                                <Link
                                    href={`/products/${saleItem.product.id}`}
                                    className="text-sm text-neutral-600 font-bold"
                                >
                                    {saleItem.product.name}
                                </Link>
                            </div>
                            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                                <span className="text-sm text-neutral-400">
                                    {saleItem.itemsCount}{' '}
                                    {saleItem.product.units}
                                </span>
                            </div>
                            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                                <span className="text-sm">
                                    {saleItem.sellingPrice.toFixed(2)} Ksh
                                </span>
                            </div>
                            <div className="px-2 w-2/12 border-e border-neutral-300 rounded-none ">
                                <span className='text-xs'>
                                    {sale.createdAt.toLocaleString(undefined, {
                                        dateStyle: 'medium',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SalesCard
