'use client'
import React, { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export function SignOut() {
	const [signout, setsignout] = useState(false)
	const handleClick = async () => {
		setsignout(true)
		await signOut()
	}

	return (
		<Link href='#' onClick={handleClick} className="flex items-center gap-2 w-full ps-7 py-2">
			{signout ? <>Logging You Out<span className="loading loading-spinner w-4 h-4 text-gray-500"></span></> : 'Log Out'}
		</Link>
	)
}