import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { ModeToggle } from "./ModeToggleComponent";

interface Props {}

function HeaderComponent() {
  return (
    <div className="w-full bg-transparent flex justify-between p-4 items-center">
      <div className="justify-start items-end">Report Crime</div>
      <div className="flex justify-between w-24">
        <div>
          <ModeToggle />
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png"  sizes="small" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
