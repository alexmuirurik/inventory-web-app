import "next-auth/jwt"
import NextAuth, { NextAuthConfig } from "next-auth"
import Resend from "next-auth/providers/resend"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/prisma"
import { onboardCashier } from "./actions/userController"

export const config = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub,
		Google,
		Resend
	],
	pages: { error: '/login' },
	callbacks: {
		async signIn({ user, profile}) {
			const cashier = await onboardCashier(profile?.email as string, user.id as string)
			if(cashier) return true
			return profile?.email?.endsWith('@alexmuiruri.com') ?? ''
		}
	},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth( config )
