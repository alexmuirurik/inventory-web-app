import React from 'react'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const SignOut = () => {
	const Signout = async () => {
		'use server'
		const signout = await signOut()
		return signout
	}
	return (
		<form action={Signout} className="w-full flex items-center justify-center" method="post" >
			<Button variant='outline' className="w-1/3 p-0">
				Click Here to Sign Out
			</Button>
		</form>
	)
}

export default SignOut