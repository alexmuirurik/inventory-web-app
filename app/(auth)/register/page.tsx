import React from "react"
import SignInForm from "@/components/auth/SignInForm"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Register = () => {
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
					<SignInForm provider="google" className="flex justify-end w-full border ">
						<button type="submit" className="flex items-center px-8 py-2">
							<FcGoogle className="me-1 text-lg" />
							Google
						</button>
					</SignInForm>
					<SignInForm provider="github" className="flex justify-end w-full border">
						<button type="submit" className="flex items-center px-8 py-2">
							<FaGithub className="me-1 text-lg" />
							Github
						</button>
					</SignInForm>
				</div>

				<div className="flex items-center justify-between w-full font-semibold text-sm inset-1 mb-4">
					<span className="border w-3/12"></span>
					<span className="text-sm px-2">Or continue with Email</span>
					<span className="border w-3/12"></span>
				</div>

				<SignInForm className="space-y-6" provider="credentials">
					<div className="form-group flex gap-2 mb-4">
						<div className="form-item">
							<label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
								First Name
							</label>
							<input id="firstname" name="firstname" required className="bg-transparent focus-within:!ring-0 border text-sm w-full ps-5 py-2" />
						</div>
						<div className="form-item">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
								Last Name
							</label>
							<input id="lastname" name="lastname" required className="bg-transparent focus-within:!ring-0 border text-sm w-full ps-5 py-2" />
						</div>
					</div>
					<div className="form-group mb-4">
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
							Email address
						</label>
						<input id="email" name="email" type="email" autoComplete="email" required className="bg-transparent focus-within:!ring-0 border text-sm w-full ps-5 py-2" />
					</div>
					<div className="form-group flex content-between mb-4">
						<div className="flex w-1/2">
							<input id="remember-me" name="remember-me" type="checkbox" className="border rounded-sm bg-slate-200 me-4" />
							<label htmlFor="remember-me" className="text-sm">Remember me</label>
						</div>
						<div className="flex w-1/2 content-end">
							<Link href="/forgot-password" className="text-sm font-bold text-blue-800">Forgot password?</Link>
						</div>
					</div>
					<div className="form-group">
						<Button type="submit" className="w-full">
							Sign Up
						</Button>
					</div>
				</SignInForm>

				<p className="mt-10 text-center text-sm text-gray-500">
					Already a member?{' '}
					<Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Sign Back In
					</Link>
				</p>
			</div>
		</div>
	)
}


export default Register