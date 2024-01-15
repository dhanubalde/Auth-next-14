import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  pages: {},

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
})