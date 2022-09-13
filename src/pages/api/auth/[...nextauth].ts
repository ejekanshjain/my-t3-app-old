import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { env } from '../../../env/server.mjs'
import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user && user) session.user.id = user.id
      return session
    }
  }
}

export default NextAuth(authOptions)
