import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { verifyCredentials } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";

export const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // For demo purposes, allow the test accounts to work
          if (credentials.email === "user@example.com" && credentials.password === "password") {
            return {
              id: "1",
              name: "Demo User",
              email: "user@example.com",
              emailVerified: new Date(),
              role: "user"
            };
          }

          // Allow the admin account to work
          if (credentials.email === "ballery@example.com" && credentials.password === "ballery@619") {
            return {
              id: "admin-user-id",
              name: "ballery",
              email: "ballery@example.com",
              emailVerified: new Date(),
              role: "admin"
            };
          }

          // Verify credentials against database
          const user = await verifyCredentials(credentials.email, credentials.password);
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // If the user is signing in with OAuth, check if they exist in the database
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          // Check if user exists
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          // If user doesn't exist, create a new user
          if (!dbUser && user.email) {
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || user.email.split('@')[0],
                emailVerified: new Date(),
                image: user.image,
              },
            });
            console.log(`Created new user from ${account.provider} login:`, dbUser.id);
          }
        } catch (error) {
          console.error(`Error handling ${account.provider} sign in:`, error);
          // Still allow sign in even if there's an error
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("JWT Callback - User:", user);
      console.log("JWT Callback - Token before:", token);

      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;

        // For the hardcoded admin account, set the role directly
        if (user.email === "ballery@example.com") {
          console.log("Setting admin role for ballery@example.com");
          token.role = "admin";
        }
        // Get user role from database for other users
        else if (user.id) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
              select: { role: true },
            });

            if (dbUser) {
              token.role = dbUser.role;
              console.log("Found role in database:", dbUser.role);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
          }
        }
      }

      console.log("JWT Callback - Token after:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Token:", token);
      console.log("Session Callback - Session before:", session);

      if (session.user) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as Date;
        session.user.role = token.role as string;

        // Ensure admin role is set for ballery@example.com
        if (session.user.email === "ballery@example.com") {
          console.log("Ensuring admin role for ballery@example.com in session");
          session.user.role = "admin";
        }
      }

      console.log("Session Callback - Session after:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
