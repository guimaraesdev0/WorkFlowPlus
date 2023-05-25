
import { UserInterface } from "@/models";
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { userController } from "@/controller";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize: async (credentials, req) => {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }
                try {
                    const userDataFromDb = await userController.userValidate({ email, password }) as UserInterface;
                    return userDataFromDb
                } catch (err) {
                    throw new Error(`${JSON.stringify(err)}`);
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    pages: {
        signIn: "/AuthPages/login",
    },
    callbacks: {
        async session({ session, user, token }) {
            const userDataFromDb = await userController.getUserByEmail(session.user.email) as UserInterface;
            session.user = userDataFromDb;
            session.user.password = ""
            return session
        }
    }
}

export default NextAuth(authOptions)