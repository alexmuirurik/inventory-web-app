import "next-auth/jwt"
import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/prisma"

export const config = {
	adapter: PrismaAdapter(prisma),
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
	debug: true,
	secret: process.env.NEXTAUTH_SECRET, // To be added
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
