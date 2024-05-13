"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
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

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed w-full z-10"> 
      {/* Fixed header with full width and background */}
      <header className="flex h-16 w-full items-center justify-between px-8 xl:px-16 xl:mx-auto xl:w-full xl:max-w-[100%] bg-[rgba(255, 255, 255, 0.1)] backdrop-filter backdrop-blur-lg" style={{ borderTop: "15px solid black" }}>
        {/* Left side links */}
        <nav className="flex gap-4 sm:gap-6 flex-1 justify-start">
          <Link className="text-sm font-medium text-white no-underline" href="/#vehicles">Vehicles</Link>
          <Link className="text-sm font-medium text-white no-underline" href="/rent?step=1">Booking</Link>
          <Link className="text-sm font-medium text-white no-underline" href="#">About</Link>
          <Link className="text-sm font-medium text-white no-underline" href="#">Contact Us</Link>
        </nav>

        {/* Centered logo */}
        <div className="flex flex-1 justify-center">
          <div className="iphone-island">
          <Link href="/">
            <Typography variant="h4" component="div" style={{ color: "white", fontWeight: "bold", userSelect: "none", fontStyle: "italic", textDecoration: "line-through", textDecorationColor: "black" }}>
              DRIVE WISE
            </Typography>
          </Link>
          </div>
        </div>

        {/* Right side - Account or Log in */}
        <div className="flex flex-1 justify-end">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="text-sm font-medium text-white no-underline flex gap-2 items-center cursor-pointer">
                  My Account
                  <ChevronDown className="size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button className="justify-start w-full" variant="ghost" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button className="justify-start w-full" variant="ghost" asChild>
                    <Link href="/account/settings">Settings</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button className="justify-start w-full" variant="ghost" asChild>
                    <Link href="/account/history">History</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button className="justify-start text-red-500 gap-2 w-full" variant="ghost" onClick={() => signOut()}>
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

