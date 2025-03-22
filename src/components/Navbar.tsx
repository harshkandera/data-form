"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import ShimmerButton from "@/components/ui/shimmer-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LogOut,
  Settings,
  FileText,
  Briefcase,
  LayoutDashboardIcon,
  User
} from "lucide-react"




function Navbar() {
  
  const { data: session, status } = useSession();
  console.log("Session:", session, "Status:", status);
  const isAuthenticated = status === "authenticated";
  
  const UserDropdown = () => {
    const userName = session?.user?.name || "User";
    const userEmail = session?.user?.email || "";
    const initials = userName.split(" ").map(name => name[0]).join("").toUpperCase().slice(0, 2);
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 pr-16 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium">
              {initials}
            </div>
            <span className="text-white font-medium hidden md:block">{userName}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 mt-2 p-1 rounded-md bg-gray-900 border border-gray-800 text-white">
          <div className="px-4 py-3">
            <p className="text-white font-medium">{userName}</p>
            <p className="text-gray-400 text-sm">{userEmail}</p>
          </div>
          <DropdownMenuSeparator className="bg-gray-700" />
          <Link href="/dashboard">
            <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
              <LayoutDashboardIcon className="mr-3 h-5 w-5 text-gray-300" />
              <span className="text-gray-200">Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/forms">
            <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
              <Briefcase className="mr-3 h-5 w-5 text-gray-300" />
              <span className="text-gray-200">My Forms</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/templates">
            <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
              <FileText className="mr-3 h-5 w-5 text-gray-300" />
              <span className="text-gray-200">My Templates</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings">
            <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
              <Settings className="mr-3 h-5 w-5 text-gray-300" />
              <span className="text-gray-200">Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem 
            className="py-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800" 
            onClick={() => signOut()}
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-300" />
            <span className="text-gray-200">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <nav className="glass flex w-full justify-between py-6 px-10 fixed z-30">
        <div className="text-white font-bold text-3xl md:text-4xl">
          <Link href="/">
            Data <span className="text-richblue-100">Form</span>
          </Link>
        </div>

        <li className="flex gap-4 items-center text-white/80 text-sm tracking-wide h-10 font-regular w-fit p-4 border-white/10 border rounded-full hidden md:flex">
          <Link
            href="/"
            className="hover:text-white/60 transition-all cursor-pointer"
          >
            Features
          </Link>
          <Link
            href="/"
            className="hover:text-white/60 transition-all cursor-pointer"
          >
            How It Works
          </Link>
          <Link
            href="/"
            className="hover:text-white/60 transition-all cursor-pointer"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="hover:text-white/60 transition-all cursor-pointer"
          >
            Testimonials
          </Link>
          <Link
            href="/"
            className="hover:text-white/60 transition-all cursor-pointer"
          >
            FAQ
          </Link>
        </li>

        <div className="flex items-center gap-6  font-regular">
          {isAuthenticated ? (
            <>
              {/* <Link href="/dashboard">
                <div className="text-white/80 hover:text-white transition-all cursor-pointer">Dashboard</div>
              </Link> */}
       
            <UserDropdown />

              {/* <ShimmerButton 
                className="h-10 cursor-pointer"
                onClick={() => signOut()}
              >
                Sign out
              </ShimmerButton> */}
            </>
          ) : (
            <>
              <Link href="/login">
                <div className="text-white/80 cursor-pointer">Login</div>
              </Link>
              <Link href="/sign-up">
                <ShimmerButton className="h-10 cursor-pointer">
                  Sign up
                </ShimmerButton>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;