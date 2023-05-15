import NextAuth, { DefaultSession } from "next-auth"
import { UserInterface } from "@/models"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user:UserInterface & DefaultSession["user"]
        token:UserInterface & DefaultSession["token"]
    }
}