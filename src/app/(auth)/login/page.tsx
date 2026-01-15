import SignInForm from "@/src/components/auth/SignInForm"
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Image from "next/image"
import Link from "next/link"
import { LoadingButton } from "@/src/components/ui/loadingbutton"
import EmailSignin from "@/src/components/auth/emailsignin"

const LoginPage = () => {
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border rounded-lg">
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
					<span className="border w-1/12"></span>
					<span className="text-xs px-2">Or continue with Email</span>
					<span className="border w-1/12"></span>
				</div>
				<EmailSignin />
			</div>
		</div>
	)
}


export default LoginPage