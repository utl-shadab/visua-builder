// lib/auth.ts (or wherever you store it)

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account }) {
      return token
    },
  },
}

// For route handlers
export const { handlers, signIn, signOut } = NextAuth(authOptions)

// ✅ For server components
export async function auth() {
  return await getServerSession(authOptions)
}
