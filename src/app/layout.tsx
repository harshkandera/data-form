"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import DesignerContextProvider from "@/src/app/context/DesignerContextType";
const AeonikPro = localFont({
  src: [
    { path: "../../public/font/AeonikProTRIAL-Light.otf", weight: "400" },
    { path: "../../public/font/AeonikProTRIAL-Bold.otf", weight: "700" },
    { path: "../../public/font/AeonikProTRIAL-Regular.otf", weight: "500" },
  ],
  variable: "--font-aeonik",
});

// app/layout.tsx
export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={`${AeonikPro.variable}`}>
      <body>
        <DesignerContextProvider>
        <QueryClientProvider client={queryClient}>
        <SessionProvider>
        {children}
        </SessionProvider>
        </QueryClientProvider>
        <Toaster richColors closeButton position="top-right" />

        </DesignerContextProvider>
      </body>
    </html>
  );
}


