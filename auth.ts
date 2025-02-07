import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import NextAuth, { type DefaultSession, type Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
  }
  interface JWT {
    username?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          console.log("認証開始:", credentials.email);
          // API Route経由で認証を行う
          const res = await fetch(
            `${process.env.API_URL}/api/auth/verify-credentials`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );
          console.log("API レスポンスステータス:", res.status);

          const user = await res.json();
          console.log("取得したユーザー:", user);
          return user;
        } catch (error) {
          console.error("認証エラー:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Googleの名前をそのまま使用
        user.username = profile?.name?.replace(/\s+/g, "");
      }
      return true;
    },
  },
});
