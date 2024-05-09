import Link from 'next/link'
import { signIn } from '@/auth'

const SignInForm = ({ provider, className, children }: { provider?:  'google' | 'github' | 'credentials', className?: string, children: any }) => {
	const Signin = async (event:any) => {
        'use server'
		const signin = await signIn(provider)
		return signin
	}
	return (
		<form action={Signin} method="post" className={'w-full ' + className}>
			{children}
		</form>
	)
}

export default SignInForm