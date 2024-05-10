import "./globals.css"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import NextTopLoader from "nextjs-toploader"

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "NextAuth.js Example",
	description: "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" dark-mode="white-content" className="dark:bg-slate-950 bg-zinc-100">
			<body className={nunito.className}>
				<NextTopLoader height={1} color="rgb(19 78 74 /1)" />
				{children}
			</body>
		</html>
	)
}
