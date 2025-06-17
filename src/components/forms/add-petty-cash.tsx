'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm, UseFormReturn } from 'react-hook-form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { pettySchema } from '@/prisma/schema'

const AddPettyCash = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof pettySchema>>
}) => {
    return (
        <div className="space-y-4">
            <FormField
                name="pettyCash"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="">
                        <FormLabel className="text-teal-500">
                            Petty Cash
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Petty Cash"
                                className="border-gray-600 text-gray-200"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="md:flex items-center gap-2">
                <FormField
                    name="losses"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-teal-500">
                                Loses
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Loses"
                                    className="border-gray-600 text-gray-200"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="miscellaneous"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-teal-500">
                                miscellaneous
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="miscellaneous"
                                    className="border-gray-600 text-gray-200"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default AddPettyCash
