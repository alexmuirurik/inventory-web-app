'use client'
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Link from 'next/link';
import { LoadingButton } from '../ui/loadingbutton';
import { Input } from '../ui/input';

const EmailSignin = () => {
    const [loading, setLoading] = useState(false)
    const signinschema = z.object({email: z.string(), remember: z.any()})
    const form = useForm<z.infer <typeof signinschema>>({resolver: zodResolver(signinschema)})
    const onFormSubmit = (data: z.infer<typeof signinschema>) => {
        setLoading(true)
    }
    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onFormSubmit)}  >
                <div className="form-group mb-4">
                    <FormField name='email' control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder='Email' type='email' className='' {...field} />
                            </FormControl>
                        </FormItem>
                    )} />                    
                </div>
                <div className="flex items-center content-between mb-4">
                    <div className="flex items-center w-1/2">
                        <FormField name='remember' control={form.control} render={({field}) => (
                            <FormItem className='flex items-center gap-2 space-y-0'>
                                <FormControl>
                                    <Input type='checkbox' className="bg-slate-200 checked:bg-teal-600 w-4 border rounded-md" {...field}/>
                                </FormControl>
                                <FormLabel className='flex text-sm items-center justify-center '>Remember Me</FormLabel>
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex w-1/2 content-end">
                        <Link href="/forgot-password" className="text-sm font-bold text-blue-800">Forgot password?</Link>
                    </div>
                </div>

                <div className="form-group">
                    <LoadingButton type='submit' className="bg-teal-600 hover:bg-teal-500 w-full" loading={loading} >
                        Sign in
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}

export default EmailSignin;
