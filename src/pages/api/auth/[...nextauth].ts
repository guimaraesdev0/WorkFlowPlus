
import { UserInterface } from "@/models";
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { userController } from "@/controller";

const authOptions: NextAuthOptions = {
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
        })
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