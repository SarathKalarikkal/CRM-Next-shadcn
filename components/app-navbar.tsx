"use client";

import React from "react";
import { Button } from "./ui/button";
import { Bell,  User2Icon, LogOut } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const router = useRouter();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

const userName = currentUser?.email?.split("@")[0];

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  router.push("/auth/signIn");
};

  return (
    <div className="flex justify-between items-center p-4 w-full h-16 custom-navbar">
      <div>
        <SidebarTrigger />
        <Button variant="ghost" size="icon">
         
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User2Icon className="h-4 w-4" />
              <span>{userName}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </div>
    </div>
  );
};

export default AppNavbar;
