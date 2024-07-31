import NextAuth from "next-auth"
import "next-auth/jwt"
import Credentials from 'next-auth/providers/credentials'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

export const config = {
	providers: [
		GitHub,
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: (credentials) => {
				const user = {
					username: 'alexmuiruri',
					email: 'dkl@gmail.com'
				}
				return user 
			}
		})
	],
	callbacks: {
		authorized({ request, auth }) {
			const { pathname } = request.nextUrl
			return true
		},
		jwt({ token, trigger, session, account }) {
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
	interface Session {
		accessToken?: string
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string
	}
}
