import SignInForm from '@/components/auth/SignInForm';
import Link from 'next/link';
import React from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

const page = () => {
	return (
		<form className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-lg'>
			<div className="w-full">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="text-center">
						<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Start your free trial</h1>
						<p className="flex gap-2 justify-center mt-2 text-sm text-gray-600 dark:text-gray-400">
							Don have an account?
							<Link href="/register" className="text-sm font-bold text-blue-800">Sign Up Here?</Link>
						</p>
					</div>

					<div className="mt-5">
						<div className="flex items-center justify-between gap-4 w-full mb-6">
							<SignInForm provider="google" className="flex border w-full">
								<button type="submit" className="flex items-center px-8 py-2">
									<FcGoogle className="me-1 text-lg" />
									Google
								</button>
							</SignInForm>
							<SignInForm provider="github" className="flex justify-end border w-full">
								<button type="submit" className="flex items-center px-8 py-2">
									<FaGithub className="me-1 text-lg" />
									Github
								</button>
							</SignInForm>
						</div>

						<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700">Or</div>

						<div className="grid grid-cols-2 gap-4">


							<div className="relative col-span-full">
								<div className="relative ">
									<label className='text-sm text-gray-400' htmlFor="password">Email</label>
									<input type="email" id="password" className="bg-transparent focus-within:!ring-0 border text-sm w-full ps-5 py-2" />
								</div>
							</div>
						</div>

						<div className="mt-5">
							<button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Request a Password</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default page