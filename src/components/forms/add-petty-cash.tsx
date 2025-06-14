import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'

const AddPettyCash = () => {
    const form = useForm()
    const handleFormSubmit = () => {}
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-4"
            >
                <FormField
                    name=""
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
                <div className="flex items-center gap-2">
                    <FormField
                        name=""
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
                        name=""
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-teal-500">
                                    miscellaneous
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Mislenious"
                                        className="border-gray-600 text-gray-200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}

export default AddPettyCash
