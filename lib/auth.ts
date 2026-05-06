import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { loginSchema } from '@/lib/validators/user'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        console.debug('[auth/authorize] attempt for email:', credentials?.email)

        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) {
          console.debug('[auth/authorize] validation failed')
          return null
        }

        const { email, password } = parsed.data

        const user = await db.user.findUnique({ where: { email } })
        if (!user) {
          console.debug('[auth/authorize] user not found:', email)
          return null
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) {
          console.debug('[auth/authorize] invalid password for:', email)
          return null
        }

        console.debug('[auth/authorize] success for:', email, 'role:', user.role)
        return { id: user.id, email: user.email, role: user.role }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: string }).role
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
