import NextAuth from "next-auth"
import "next-auth/jwt"

import Cognito from "next-auth/providers/cognito"
import Credentials from 'next-auth/providers/credentials'
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"

import type { NextAuthConfig } from "next-auth"

export const config = {
	theme: { logo: "https://authjs.dev/img/logo-sm.png" },
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
			if (pathname === "/middleware-example") return !!auth
			return true
		},
		jwt({ token, trigger, session, account }) {
			if (trigger === "update") token.name = session.user.name
			if (account?.provider === "keycloak") {
				return { ...token, accessToken: account.access_token }
			}
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
