'use client'
import { useState } from 'react'
import CustomDialog from './customdialog'
import AddStockReport from './add-stock-report'
import AddSaleReport from './add-sale-report'
import { Button } from '../ui/button'
import DialogPagigation from '../cards/dialog-pagination'
import AddPettyCash from './add-petty-cash'

const OrderLineActions = () => {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)
    const [action, setAction] = useState<'sales' | 'stock' | 'petty'>('sales')

    const onOrderLineSubmit = () => {
        if (step === 0 && step < 1) {
            return setStep(step + 1)
        }
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle="Add Report"
            description="Add Product Report For the Day"
        >
            <div className="space-y-4">
                <div className="flex items-center justify-center">
                    <DialogPagigation pages={2} current={step} />
                </div>
                <div className="p-5 space-y-4">
                    <div className="bg-transparent border-0 space-y-8">
                        {step === 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`${
                                            action === 'sales' && 'bg-teal-600'
                                        } flex justify-center items-center border border-dashed rounded-md w-full min-h-32 cursor-pointer`}
                                        onClick={() => setAction('sales')}
                                    >
                                        <h3 className="text-base text-white font-semibold text-center">
                                            Add Sales Report
                                        </h3>
                                    </div>
                                    <div
                                        className={`${
                                            action === 'stock' && 'bg-teal-600'
                                        } flex justify-center items-center border border-dashed rounded-md w-full min-h-32 cursor-pointer`}
                                        onClick={() => setAction('stock')}
                                    >
                                        <h3 className="text-base text-white font-semibold text-center">
                                            Add Stock Report
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        action === 'petty' && 'bg-teal-600'
                                    } flex justify-center items-center border border-dashed rounded-md w-full min-h-32 cursor-pointer`}
                                    onClick={() => setAction('petty')}
                                >
                                    <h3 className="text-base text-white font-semibold text-center">
                                        Add Petty Cash
                                    </h3>
                                </div>
                            </div>
                        )}
                        {step === 1 && action === 'stock' && <AddStockReport />}
                        {step === 1 && action === 'sales' && <AddSaleReport />}
                        {step === 1 && action === 'petty' && <AddPettyCash />}
                        <div className="flex justify-between">
                            <Button
                                className="font-medium"
                                disabled={step === 0}
                                onClick={() => step > 0 && setStep(step - 1)}
                            >
                                Back
                            </Button>
                            <Button
                                className="font-medium"
                                onClick={onOrderLineSubmit}
                            >
                                {step > 0 ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CustomDialog>
    )
}

export default OrderLineActions
