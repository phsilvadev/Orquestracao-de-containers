import { axiosBase } from "@/shared/lib/axiosBase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axiosBase.post("/auth/singIn", {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (res.data) {
          return {
            ...res.data,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            loggedIn: true,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
  },
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...user,
        id: token.id as number,
        email: token.email as string,
        access_token: token.access_token as string,
        loggedIn: token.loggedIn as boolean,
        refresh_token: token.refresh_token as string,
        uuid_code: token.uuid_code as string,
        name: token.name as string,
      };
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.user.access_token) {
          token.access_token = session.user.access_token;
        }
        if (session.user.refresh_token) {
          token.refresh_token = session.user.refresh_token;
        }
        if (session.user.id) {
          token.id = session.user.id;
        }
        if (session.user.email) {
          token.email = session.user.email;
        }
        if (session.user.name) {
          token.name = session.user.name;
        }
        if (session.user.uuid_code) {
          token.uuid_code = session.user.uuid_code;
        }
        if (session.user.loggedIn) {
          token.loggedIn = session.user.loggedIn;
        }
      }

      return { ...token, ...user };
    },
  },
});

export { handler as GET, handler as POST };
