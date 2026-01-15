import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import Image from 'next/image'

const AuthLayout = async ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const session = await auth()
    if (session?.user) return redirect('/')
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm mb-2">
                <Image
                    src="/logo.png"
                    alt=""
                    width={30}
                    height={30}
                    className="me-2"
                />
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="border">{children}</div>
        </div>
    )
}

export default AuthLayout
