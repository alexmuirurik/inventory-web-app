'use client'
import { useState } from 'react'
import CustomDialog from './customdialog'
import AddStockReport from './add-stock-report'
import AddSaleReport from './add-sale-report'
import { Button } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { cn } from '@/src/lib/utils'

const OrderLineActions = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)
    const [action, setAction] = useState<'sales' | 'stock'>()
    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle="Add Report"
            description="Add Product Report For the Day"
        >
            {step === 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        {Array.of(2).map((_, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className={cn(
                                        'w-4 h-4 rounded-full transition-all duration-300 ease-in-out',
                                        index <= step
                                            ? 'bg-primary'
                                            : 'bg-primary/30',
                                        index <= step && 'bg-primary'
                                    )}
                                />
                                {index === step && (
                                    <div className="flex items-center">
                                        <div
                                            className={cn(
                                                'w-8 h-0.5',
                                                index < step
                                                    ? 'bg-primary'
                                                    : 'bg-primary/30'
                                            )}
                                        />
                                        <div
                                            className={cn(
                                                'w-4 h-4 rounded-full transition-all duration-300 ease-in-out',
                                                index < step
                                                    ? 'bg-primary'
                                                    : 'bg-primary/30',
                                                index < step && 'bg-primary'
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="bg-transparent border-0 space-y-4">
                            <div className="border border-dashed rounded-md">
                                <div className="flex flex-col items-center justify-center h-[8rem]">
                                    <h3 className="text-base font-semibold text-center">
                                        No Inputs Added Yet!
                                    </h3>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Start building your form by adding input
                                        fields.
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    type="button"
                                    className="font-medium"
                                    size="sm"
                                    disabled={step === 0}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="font-medium"
                                >
                                    {step > 0 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 1 && action === 'stock' && <AddStockReport />}
            {step === 1 && action === 'sales' && <AddSaleReport />}
        </CustomDialog>
    )
}

export default OrderLineActions
