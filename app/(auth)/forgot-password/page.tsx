import React from 'react'
import { FcGoogle } from "react-icons/fc";

const page = () => {
	return (
		<form className='w-full'>
			<div className="w-full">
				<div className="p-4 sm:p-7 flex flex-col border rounded-2xl shadow-lg dark:bg-slate-900">
					<div className="text-center">
						<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Start your free trial</h1>
						<p className="flex gap-2 justify-center mt-2 text-sm text-gray-600 dark:text-gray-400">
							Don have an account?
							<a className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
								Sign Up here
							</a>
						</p>
					</div>

					<div className="mt-5">
						<button type="button" className="flex justify-center items-center gap-2 border w-full py-2">
							<FcGoogle className='w-6 h-6' />
							Sign in with Google
						</button>

						<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700">Or</div>

						<div className="grid grid-cols-2 gap-4">


							<div className="relative col-span-full">
								<div className="relative ">
									<label className='text-sm text-gray-400' htmlFor="password">Email</label>
									<input type="email" id="password" className="bg-transparent focus-within:!ring-0 border text-sm w-full ps-5 py-2"  />
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