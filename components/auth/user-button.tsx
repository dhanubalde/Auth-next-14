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

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger className=" relative flex items-center gap-x-4 capitalize">
          <p className=" relative font-medium">
            @{user?.name}
            
        </p>
        
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className=" bg-slate-950">
              <FaUser className="text-white" />
          </AvatarFallback>
          </Avatar>
          <span className="h-[13px] w-[13px] bg-green-600 absolute rounded-full mt-6 ml-[71px] border"></span>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 shadow-xl" align="end">
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
