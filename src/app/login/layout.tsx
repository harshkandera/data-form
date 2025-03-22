import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "DataForm",
  description: "Custom Form builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
        <div className="relative">
        <Navbar />
        <main className="bg-richblue-500">{children}</main>
        </div>
    
  );
}
