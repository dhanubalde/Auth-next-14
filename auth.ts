import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },  
  events: {
    async linkAccount({ user }) { 
      await db.user.update({
        where: { id: user.id },
        data: {emailVerified: new Date()}
      })
    }
  },

  callbacks: {
    async session({ token, session }) { 
      // console.log({
      //   sessionToken: token,
      //   session
      // });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
    return session
    },
      
    async jwt({ token }) { 
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // const existingAccount = await getAccountByUserI(
      //   existingUser.id
      // );

      // token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
})