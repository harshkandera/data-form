import NextAuth from "next-auth";
import {authOptions} from "@/auth"; // Ensure this path is correct

export const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
