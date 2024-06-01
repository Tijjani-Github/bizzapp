import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login, getrefreshtoken } from "./actions/auth";
import { LoginSchema } from "./schema";
import { jwtDecode } from "jwt-decode";

export default {
  providers: [
    Credentials({
      credentials: {
        identifier: {
          label: "Username | email",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        //@ts-ignore
        const parsedValues = JSON.parse(credentials.loginva);
        const validatedFields = LoginSchema.safeParse(parsedValues);
        if (!validatedFields.success) {
          return null;
        }
        const { identifier, password } = validatedFields.data;
        const res = await login({ identifier, password });
        if (!res) return null;

        const user = res.user;

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }: any) {
      return { ...account, ...profile, ...user };
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
