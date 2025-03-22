import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "user" | "admin";
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
    isVerified: boolean;
  }
}
