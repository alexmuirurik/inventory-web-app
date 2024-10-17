import React from "react"
import SignInForm from "@/components/auth/SignInForm"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Image from "next/image"
import Link from "next/link"
import { LoadingButton } from "@/components/ui/loadingbutton"
import EmailSignin from "@/components/auth/emailsignin"

const LoginPage = () => {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-lg">
			<div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm mb-6">
				<Image src='/logo.png' alt="" width={30} height={30} className="me-2" />
				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="flex items-center justify-between gap-4 w-full mb-6">
					<SignInForm provider="google" className="flex  w-full">
						<LoadingButton type="submit" className="flex items-center border w-full px-8 py-2" variant='outline'>
							<FcGoogle className="me-1 text-lg" />
							Google
						</LoadingButton>
					</SignInForm>
					<SignInForm provider="github" className="flex justify-end w-full">
						<LoadingButton type="submit" className="flex items-center border w-full px-8 py-2" variant='outline'>
							<FaGithub className="me-1 text-lg" />
							Github
						</LoadingButton>
					</SignInForm>
				</div>

				<div className="flex items-center justify-between w-full font-semibold text-sm inset-1 mb-4">
					<span className="border w-3/12"></span>
					<span className="text-sm px-2">Or continue with Email</span>
					<span className="border w-3/12"></span>
				</div>
				<EmailSignin />
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Register For Free
					</Link>
				</p>
			</div>
		</div>
	)
}


export default LoginPage