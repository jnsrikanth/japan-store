import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT || 587),
        auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
      },
      from: process.env.EMAIL_FROM!,
      maxAge: 24 * 60 * 60,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};
