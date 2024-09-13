import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

const nunito = Nunito({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
	title: "NextAuth.js Example",
	description: "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" theme-mode="white-content" className="bg-zinc-100">
			<body className={nunito.className}>
				<NextTopLoader height={1} color="teal" />
				{children}
				<Toaster />
			</body>
		</html>
	)
}
