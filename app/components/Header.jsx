"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import { Store } from "lucide-react";
import { UserDetailContext } from "../../context/userDetailContext";

function Header() {
   const { userDetail,setUserDetail } = React.useContext(UserDetailContext);
  const user = userDetail;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white py-3 px-6 flex items-center justify-between shadow-md z-50">
      {/* Logo & App Name */}
      <Link href="/" className="flex items-center space-x-2">
        <Store color="green" />
        <span className="text-lg font-bold text-gray-500">Review Hive</span>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/stores" className="hover:text-gray-300">Stores</Link>
      </nav>

      {
        user?.role === "store-owner" && (
          <nav className="hidden md:flex space-x-6">
            <Link href="/owner-dashboard" className="hover:text-gray-300">Store Owner Dashboard</Link>
          </nav>
        )
      }
          
      {/* User Profile & Dropdown */}
      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.profilePic || "/default-avatar.png"} alt="User" />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block">{user.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {user?.role==="system" && <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>}
              <DropdownMenuItem onClick={() =>{ localStorage.removeItem("user"); setUserDetail(null)}} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
