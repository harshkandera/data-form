import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import { AppSidebar } from "@/src/app/dashboard/(components)/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-richblue-500 ">
        <header className="flex h-16  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          </div>
        </header>

        <div className="relative">
          <main className="bg-richblue-500 mx-32 m-10">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
