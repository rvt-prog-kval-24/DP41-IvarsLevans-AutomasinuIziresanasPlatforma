"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { signOut, useSession, getSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  admin?: boolean;
  image?: string;
}

const Header = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async (email: string) => {
      try {
        const response = await fetch(`/api/user?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        return data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    const initializeUser = async () => {
      if (session?.user?.email) {
        const updatedUser = await fetchUserData(session.user.email);
        setUser(updatedUser);
        if (updatedUser && updatedUser.admin) {
          setIsAdmin(true);
        }
      }
    };

    if (session?.user) {
      initializeUser();
    }
  }, [session]);

  if (status === "loading") {
    return <div className="fixed w-full z-10 h-16 bg-[rgba(255, 255, 255, 0.1)] backdrop-filter backdrop-blur-lg" />;
  }

  return (
    <div className="fixed w-full z-10">
      <header className="flex h-16 w-full items-center justify-between px-8 xl:px-16 xl:mx-auto xl:w-full xl:max-w-[100%] bg-[rgba(255, 255, 255, 0.1)] backdrop-filter backdrop-blur-lg" style={{ borderTop: "15px solid black" }}>
        <nav className="flex gap-4 sm:gap-6 flex-1 justify-start">
          <Link className="text-sm font-medium text-white no-underline" href="/#vehicles">Vehicles</Link>
          <Link className="text-sm font-medium text-white no-underline" href="/rent?step=1">Booking</Link>
        </nav>

        <div className="flex flex-1 justify-center">
          <div className="iphone-island">
            <Link href="/">
              <Typography variant="h4" component="div" style={{ color: "white", fontWeight: "bold", userSelect: "none", fontStyle: "italic", textDecoration: "line-through", textDecorationColor: "black" }}>
                DRIVE WISE
              </Typography>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 justify-end">
          {session && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="text-sm font-medium text-white no-underline flex gap-2 items-center cursor-pointer">
                  My Account
                  <ChevronDown className="size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Button className="justify-start w-full" variant="ghost" asChild>
                      <Link href="/admin">Admin</Link>
                    </Button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Button className="justify-start w-full" variant="ghost" asChild>
                    <Link href="/account/history">History</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button className="justify-start w-full" variant="ghost" asChild>
                    <Link href="/account/settings">Settings</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button className="justify-start text-red-500 gap-2 w-full" variant="ghost" onClick={() => signOut({ callbackUrl: '/' })}>
                    Sign out
                    <LogOut className="size-4" />
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link className="text-sm font-medium text-white no-underline ml-12" href="/login">Log In</Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
