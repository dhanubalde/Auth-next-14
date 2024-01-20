"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  const pathname = usePathname()

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger>
  
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className=" bg-slate-950">
              <FaUser className="text-white" />
          </AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[10rem] shadow-xl" align="end">
        <DropdownMenuItem className=" cursor-pointer">
            {/* <Button
              asChild
              variant={pathname === "/settings" ? "outline" : "outline"}
            > */}
            <Link
              className="hover:bg-transparent w-full rounded-lg"
              href="/settings"
            >
                Settings
              </Link>
            {/* </Button> */}
          </DropdownMenuItem> 
            <LogoutButton >
              <DropdownMenuItem className=" cursor-pointer">
                <ExitIcon className="h-4 w-4 mr-2 " />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
      </DropdownMenuContent>
      </DropdownMenu>
    </>  
  );
};
