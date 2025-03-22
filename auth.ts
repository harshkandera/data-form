import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./lib/db";
import UserModel from "./src/models/User"; // Ensure correct import

export const authOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

      async profile(profile) {

        console.log("Profile:", profile);
        
        await connectToDatabase();


        let user = await UserModel.findOne({ email: profile.email });

        if (!user) {
          user = await UserModel.create({
            email: profile.email,
            name: profile.name,
            googleId: profile.sub,
            image: profile.picture,
            provider: "google",
            isVerified: true, 
          });
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          provider: user.provider,
        } as any;
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectToDatabase();

        const user = await UserModel.findOne({ email });

        if (!user || typeof user.password !== "string") {
          throw new Error("User not found or password is invalid");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        const authUser: User = {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: user.isVerified,
        };

        return authUser; // ✅ Correctly typed return value
      },
    }),
  ],

  session: { strategy: "jwt" as const },

  callbacks: {
    async jwt({ token, user }:{token: any, user: any}) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }:{session:any, token:any}) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as "user" | "admin";
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET || "",
}

