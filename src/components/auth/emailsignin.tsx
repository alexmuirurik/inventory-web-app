'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { LoadingButton } from '../ui/loadingbutton'
import { Input } from '../ui/input'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '../ui/input-otp'
import { signinschema } from '@/prisma/schema'
import Link from 'next/link'
import { useToast } from '../ui/use-toast'

const EmailSignin = () => {
    const [sentOTP, setSentOTP] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof signinschema>>({
        resolver: zodResolver(signinschema),
    })

    const requestOTP = async () => {
        if (
            form.watch('email') === '' ||
            form.watch('email') === null ||
            form.watch('email') === undefined
        ) {
            toast({
                title: 'Error',
                description: 'Please enter your email',
                variant: 'destructive',
            })
            return
        }
        
        try {
            setLoading(true)
            setSentOTP(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast({
                title: 'OTP Sent',
                description: 'Please check your email for OTP',
                variant: 'success',
            })
            setLoading(false)
        } catch (error) {
            toast({
                title: 'Error',
                description: `${error}`,
                variant: 'destructive',
            })
        }
    }

    const onFormSubmit = (data: z.infer<typeof signinschema>) => {
        setLoading(true)
    }
    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onFormSubmit)}
            >
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="border-neutral-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {sentOTP && (
                    <div className="space-y-2">
                        <div className="flex justify-end">
                            <Link
                                href="#"
                                className="text-xs text-teal-600"
                                onClick={requestOTP}
                            >
                                Request Another OTP
                            </Link>
                        </div>
                        <FormField
                            name="otp"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={0}
                                                />
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={1}
                                                />
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={2}
                                                />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={3}
                                                />
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={4}
                                                />
                                                <InputOTPSlot
                                                    className="border border-neutral-300"
                                                    index={5}
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
                <div className="form-group">
                    {sentOTP ? (
                        <LoadingButton
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-500 w-full"
                            loading={loading}
                        >
                            Sign in
                        </LoadingButton>
                    ) : (
                        <LoadingButton
                            className="bg-teal-600 hover:bg-teal-500 w-full"
                            loading={loading}
                            onClick={requestOTP}
                        >
                            Request OTP
                        </LoadingButton>
                    )}
                </div>
            </form>
        </Form>
    )
}

export default EmailSignin
