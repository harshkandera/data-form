"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings2,
  Archive,
  FileArchive,
  LogOut,
  Bell
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";

// Base navigation items without active state
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Forms",
    url: "/dashboard/my-forms",
    icon: Archive,
  },
  {
    title: "My Templates",
    url: "/dashboard/my-templates",
    icon: FileArchive,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
    onClick: () => signOut()
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Create user data from session
  const userData = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@example.com",
    avatar: session?.user?.image || "/avatars/default.jpg",
  };
  
  // Dynamically set active state based on current URL
  const navMain = React.useMemo(() => {
    return navItems.map(item => ({
      ...item,
      isActive: pathname === item.url || 
                (item.url !== "#" && pathname.startsWith(item.url) && item.url !== "/dashboard") ||
                (item.url === "/dashboard" && pathname === "/dashboard")
    }));
  }, [pathname]);
  
  // Combine static data with user data and dynamic nav items
  const data = {
    navMain,
    user: userData,
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-richblue-500 group-data-[collapsible=icon]:bg-white"
    >
      <SidebarHeader>
        <div className="text-white font-bold text-2xl md:text-3xl">
          <Link href="/">
            Data <span className="text-richblue-100">Form</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}