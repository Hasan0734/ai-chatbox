"use client";

import * as React from "react";
// import { Avatar } from "@mui/material";

import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const userNavigation = [
  {
    id: "1",
    name: "Your profile",
    href: "/settings",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    id: "2",
    name: "Settings",
    href: "/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "bg-gray-800 text-white group flex items-center gap-x-2 rounded-md p-2 w-full text-left  text-sm leading-6 font-semibold"
          }
        >
          {/* <Avatar
            className="bg-black text-white"
            sx={{ width: 40, height: 40 }}
          >
            "Hello"
          </Avatar> */}
          <User className="mr-2 h-6 w-6 border rounded-full p-1" />
          <span>Jahid</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px]  bg-gray-800 border-0 p-1 ">
        {userNavigation.map((item) => (
          <>
            <DropdownMenuItem
              key={item.id}
              className="hover:bg-gray-700 focus:bg-gray-700 focus:text-white  text-white group p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold"
            >
              <a href={item.href} className={"flex gap-x-3 items-center"}>
                {item.icon}
                {item.name}
              </a>
            </DropdownMenuItem>
          </>
        ))}
        <DropdownMenuSeparator className={"bg-gray-500"} />
        <DropdownMenuItem
          onClick={() => console.log("Hello")}
          className={
            "hover:bg-gray-700 focus:bg-gray-700 focus:text-white  text-white group flex gap-x-3 p-2 w-full text-left rounded-sm text-sm leading-6 font-semibold"
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
