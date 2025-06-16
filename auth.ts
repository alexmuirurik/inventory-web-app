import 'next-auth/jwt'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Resend from 'next-auth/providers/resend'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'

export const config = {
    adapter: PrismaAdapter(prisma),
    providers: [GitHub, Google, Resend],
    pages: { error: '/login' },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
