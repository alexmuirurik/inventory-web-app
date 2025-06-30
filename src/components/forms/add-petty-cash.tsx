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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'

const AddPettyCash = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof pettySchema>>
}) => {
    return (
        <div className="space-y-4">
            <div className="flex">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel className="text-teal-500">
                                Date 
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className="border-gray-600 text-gray-200"
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full p-0"
                                    align="center"
                                >
                                    <Calendar
                                        className="w-full"
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
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
                                Spoilt Items
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
                                Other Expenses
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
