'use client'
import React, { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { LoadingButton } from "../ui/loadingbutton"

export function SignOut() {
	const [signout, setsignout] = useState(false)
	const handleClick = async () => {
		setsignout(true)
		await signOut()
	}

	return (
		<Link href='#' onClick={handleClick} className="flex items-center gap-2 w-full ps-7">
			<LoadingButton className="p-0 border-0" loading={signout} variant='outline'>
				SignOut
			</LoadingButton>
		</Link>
	)
}