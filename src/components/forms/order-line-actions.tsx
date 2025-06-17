'use client'
import { useState } from 'react'
import CustomDialog from './customdialog'
import AddStockReport from './add-stock-report'
import AddSaleReport from './add-sale-report'
import { Button } from '../ui/button'
import DialogPagigation from '../cards/dialog-pagination'
import AddPettyCash from './add-petty-cash'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Form } from '../ui/form'
import { z } from 'zod'
import { pettySchema, salesSchema, stockSchema } from '@/prisma/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '../ui/loadingbutton'
import { toTitleCase } from '@/src/lib/utils'
import { useToast } from '../ui/use-toast'
import { createStock } from '@/src/actions/stockController'
import { CompleteProduct } from '@/prisma/types'
import { useRouter } from 'next/navigation'
import { BusinessLocation } from '@prisma/client'
import { createSale } from '@/src/actions/salesController'
import { createPettyCash } from '@/src/actions/pettyCashController'

const OrderLineActions = ({
    products,
    businessLocation,
}: {
    products: CompleteProduct[]
    businessLocation: BusinessLocation | undefined
}) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [action, setAction] = useState<'sales' | 'stock' | 'petty'>('sales')
    const { toast } = useToast()
    const router = useRouter()
    const stockForm = useForm<z.infer<typeof stockSchema>>({
        resolver: zodResolver(stockSchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
        },
    })
    const salesForm = useForm<z.infer<typeof salesSchema>>({
        resolver: zodResolver(salesSchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
        },
    })
    const pettyForm = useForm<z.infer<typeof pettySchema>>({
        resolver: zodResolver(pettySchema),
        defaultValues: {
            businessLocationId: businessLocation?.id,
        },
    })

    const form =
        action === 'stock'
            ? stockForm
            : action === 'sales'
            ? salesForm
            : pettyForm

    const onOrderLineSubmit = (action: 'plus' | 'minus') => {
        if (step === 0 && action === 'plus') {
            return setStep(step + 1)
        }

        if (step === 1 && action === 'minus') {
            return setStep(step - 1)
        }
    }

    const handleFormSubmit = async (data: z.infer<any>) => {
        setLoading(true)
        try {
            const success = {
                title: 'Success',
                description: '',
                variant: 'success' as const,
            }

            if (action === 'stock') {
                const stock = await createStock(data)
                if (stock) {
                    success.description = 'Stock created successfully'
                    stockForm.reset({})
                }
            }

            if (action === 'sales') {
                const sale = await createSale(data)
                if (sale) {
                    success.description = 'Sale created successfully'
                    salesForm.reset({})
                }
            }

            if (action === 'petty') {
                const petty = await createPettyCash(data)
                if (petty) {
                    success.description = 'Petty Cash created successfully'
                    pettyForm.reset({})
                }
            }

            setStep(0)
            setOpen(false)
            toast(success)
            router.refresh()
        } catch (error: any) {
            toast({
                title: 'Failed',
                description: error,
                variant: 'destructive',
            })
        }

        setLoading(false)
    }

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            btntitle={`Add ${toTitleCase(action)} Report`}
            description="Add Product Report For the Day"
        >
            <Form {...(form as UseFormReturn<z.infer<any>>)}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                    <div className="flex items-center justify-center">
                        <DialogPagigation pages={2} current={step} />
                    </div>
                    <div className="bg-transparent border-0 p-5 space-y-8">
                        {step === 0 && (
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row items-center gap-4 ">
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

                        {step === 1 && action === 'stock' && (
                            <AddStockReport
                                products={products}
                                form={stockForm}
                            />
                        )}

                        {step === 1 && action === 'sales' && (
                            <AddSaleReport
                                products={products}
                                form={salesForm}
                            />
                        )}

                        {step === 1 && action === 'petty' && (
                            <AddPettyCash form={pettyForm} />
                        )}

                        <div className="flex justify-between">
                            <LoadingButton
                                className="font-medium"
                                disabled={step === 0}
                                onClick={() => onOrderLineSubmit('minus')}
                            >
                                Back
                            </LoadingButton>
                            <LoadingButton
                                type={step === 0 ? 'button' : 'submit'}
                                className="font-medium"
                                loading={loading}
                                onClick={() => {
                                    if (step === 0) {
                                        onOrderLineSubmit('plus')
                                    }
                                }}
                            >
                                {step === 0 ? 'Next' : 'Submit'}
                            </LoadingButton>
                        </div>
                    </div>
                </form>
            </Form>
        </CustomDialog>
    )
}

export default OrderLineActions
