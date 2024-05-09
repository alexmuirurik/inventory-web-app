import { signIn, signOut } from "auth"
import { Button } from "../ui/button"

export function SignIn({ provider, ...props }: { provider?:  string } & React.ComponentPropsWithRef<typeof Button>) {
	const Signin = async (event:any) => {
		'use server'
		const signin = await signIn(provider)
		return signin
	}
	return (
		<form action={Signin} method="post">
			<Button {...props}>Sign In</Button>
		</form>
	)
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
	const Signout = async () => {
		'use server'
		const signout = await signOut()
		return signout
	}
	return (
		<form action={Signout} className="w-full" method="post" >
			<Button variant="ghost" className="w-full p-0" {...props}>
				Sign Out
			</Button>
		</form>
	)
}
