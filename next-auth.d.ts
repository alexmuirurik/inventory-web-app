import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        email: string
        role: string
        activeLocation: string
    }

    interface Session {
        user: User & DefaultSession["user"]
        expires: string
        error: string
    }
}