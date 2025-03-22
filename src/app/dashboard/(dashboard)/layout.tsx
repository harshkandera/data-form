import type { Metadata } from "next";

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
      <main className=" m-10">{children}</main>
    </div>
  );
}
