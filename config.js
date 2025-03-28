import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "./libs/prisma";

export const NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                initials: '',
                password: ''
            },
            async authorize(credentials) {
                console.log(credentials);
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            initials: credentials?.initials
                        }

                    });

                    if (!user) {
                        return null;  // user not found
                    }

                    const correctPassword = await compare(credentials.password, user.password);
                    if (correctPassword) {
                        return {
                            id: user.id,
                            nickname: user.nickname,
                            role: user.role
                        };
                    } else {
                        return null;  // incorrect password
                    }


                } catch (error) {
                    console.error('Error fetching user:', error);
                    return null;  // in case of error during fetching
                } finally {
                    await prisma.$disconnect();
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ token, session }) {
            session.user = {
                nickname: token.nickname,
                role: token.role,
                id: token.id
            };
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};
